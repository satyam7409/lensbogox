import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import NumberLogin from "./pages/auth/NumberLogin";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { syncSocketWithAuth } from "./socket/socket";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { useAuthStore } from "./store/auth.store";

function App() {
  const [isFirebaseReady, setFirebaseReady] = useState(false);
  const mongoUser = useAuthStore((s) => s.user);

  useEffect(() => {
    let unsubToken: (() => void) | undefined;

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseReady(true);
      unsubToken?.();

      if (firebaseUser && useAuthStore.getState().user) {
        await syncSocketWithAuth();

        unsubToken = onIdTokenChanged(auth, async (user) => {
          if (user && useAuthStore.getState().user) {
            await syncSocketWithAuth();
          }
        });
      } else {
        await syncSocketWithAuth();
      }
    });

    return () => {
      unsubAuth();
      unsubToken?.();
    };
  }, []);

  // Connect socket after zustand rehydrates user from localStorage
  useEffect(() => {
    if (mongoUser && auth.currentUser) {
      syncSocketWithAuth();
    }
  }, [mongoUser]);

  if (!isFirebaseReady) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#F7FBFC" }}
      >
        <div
          className="w-8 h-8 border-2 border-[#3BBFD4]
                        border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<NumberLogin />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:dealID"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
