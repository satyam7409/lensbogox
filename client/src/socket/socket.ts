import { io } from "socket.io-client";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth.store";


const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

let currentToken: string | null = null;
let lastConnectError: string | null = null;

type VoidCb = () => void;
type JoinCb = (ok: boolean) => void;

const connectListeners = new Set<VoidCb>();
const newDealListeners = new Set<VoidCb>();
const statusListeners = new Set<(connected: boolean) => void>();

interface PendingJoin {
  dealId: string;
  cb?: JoinCb;
}

const pendingJoins: PendingJoin[] = [];

const notifyStatus = (connected: boolean) => {
  statusListeners.forEach((cb) => cb(connected));
};

const emitJoin = (dealId: string, cb?: JoinCb) => {
  socket.emit(
    "join_room",
    { dealId },
    (res: { ok?: boolean } | undefined) => {
      cb?.(!!res?.ok);
    },
  );
};

const flushPendingJoins = () => {
  if (!socket.connected || pendingJoins.length === 0) return;
  const batch = pendingJoins.splice(0, pendingJoins.length);
  batch.forEach(({ dealId, cb }) => emitJoin(dealId, cb));
};

socket.on("connect", () => {
  lastConnectError = null;
  notifyStatus(true);
  flushPendingJoins();
  connectListeners.forEach((cb) => cb());
});

socket.on("disconnect", () => {
  notifyStatus(false);
});

socket.on("new_deal", () => {
  newDealListeners.forEach((cb) => cb());
});

socket.on("connect_error", async (err) => {
  lastConnectError = err.message;
  notifyStatus(false);

  // Profile not saved yet — don't retry in a loop
  if (err.message.includes("USER_NOT_REGISTERED")) {
    return;
  }

  const user = auth.currentUser;
  const mongoUser = useAuthStore.getState().user;
  if (!user || !mongoUser) return;

  try {
    const freshToken = await user.getIdToken(true);
    currentToken = null;
    connectSocket(freshToken);
  } catch {
    // session expired
  }
});

/** Connect only when Firebase + MongoDB user both exist */
export const syncSocketWithAuth = async () => {
  const firebaseUser = auth.currentUser;
  const mongoUser = useAuthStore.getState().user;

  if (!firebaseUser || !mongoUser) {
    disConnectSocket();
    return;
  }

  const token = await firebaseUser.getIdToken();
  connectSocket(token);
};

export const connectSocket = (token: string) => {
  if (socket.connected && currentToken === token) return;

  currentToken = token;
  socket.auth = { token };

  if (socket.connected) {
    socket.disconnect();
  }
  socket.connect();
};

export const disConnectSocket = () => {
  currentToken = null;
  if (socket.connected) {
    socket.disconnect();
  }
};

export const getLastConnectError = () => lastConnectError;

export const isSocketConnected = () => socket.connected;

export const onSocketReconnect = (cb: VoidCb) => {
  connectListeners.add(cb);
  return () => {
    connectListeners.delete(cb);
  };
};

export const onNewDeal = (cb: VoidCb) => {
  newDealListeners.add(cb);
  return () => {
    newDealListeners.delete(cb);
  };
};

export const onSocketStatus = (cb: (connected: boolean) => void) => {
  statusListeners.add(cb);
  cb(socket.connected);
  return () => {
    statusListeners.delete(cb);
  };
};

export const joinDealRoom = (dealId: string, onResult?: JoinCb) => {
  if (!socket.connected) {
    pendingJoins.push({ dealId, cb: onResult });
    syncSocketWithAuth();
    return;
  }
  emitJoin(dealId, onResult);
};

export default socket;
