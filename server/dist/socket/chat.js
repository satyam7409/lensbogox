import Message from "../models/message.js";
import Deal from "../models/deal.js";
const roomId = (dealId) => String(dealId);
const serializeMessage = (doc) => {
    const sender = doc.senderId;
    return {
        _id: doc._id.toString(),
        dealId: doc.dealId.toString(),
        content: doc.content,
        isRead: doc.isRead,
        createdAt: doc.createdAt,
        senderId: {
            _id: sender._id.toString(),
            displayName: sender.displayName,
            avatarInitials: sender.avatarInitials ?? "",
        },
    };
};
export const registerChatHandlers = (io, socket) => {
    socket.on("join_room", async ({ dealId }, callback) => {
        try {
            if (!dealId) {
                callback?.({ ok: false, error: "Deal id required" });
                return;
            }
            const deal = await Deal.findById(dealId);
            if (!deal) {
                callback?.({ ok: false, error: "No deal found" });
                return;
            }
            const isParticipant = deal.hostUserId.toString() === socket.userId ||
                deal.joinerUserId.toString() === socket.userId;
            if (!isParticipant) {
                callback?.({ ok: false, error: "Not a participant" });
                return;
            }
            await socket.join(roomId(dealId));
            callback?.({ ok: true });
        }
        catch {
            callback?.({ ok: false, error: "Can't join room" });
        }
    });
    socket.on("leave_room", ({ dealId }) => {
        if (dealId)
            socket.leave(roomId(dealId));
    });
    socket.on("send_message", async ({ dealId, content }, callback) => {
        try {
            if (!content?.trim() || !dealId) {
                callback?.({ ok: false, error: "Invalid message" });
                return;
            }
            const deal = await Deal.findById(dealId);
            if (!deal) {
                callback?.({ ok: false, error: "No deal found" });
                return;
            }
            const isParticipant = deal.hostUserId.toString() === socket.userId ||
                deal.joinerUserId.toString() === socket.userId;
            if (!isParticipant) {
                callback?.({ ok: false, error: "Unauthorized" });
                return;
            }
            const trimmed = content.trim();
            const id = roomId(dealId);
            // Ensure sender is in the room before broadcasting
            await socket.join(id);
            const message = await Message.create({
                dealId: dealId,
                senderId: socket.userId,
                content: trimmed,
                isRead: false,
            });
            const populated = await message.populate("senderId", "displayName avatarInitials");
            const payload = serializeMessage(populated);
            io.to(id).emit("receive_message", payload);
            callback?.({ ok: true, message: payload });
        }
        catch (err) {
            console.error("send_message error:", err);
            callback?.({ ok: false, error: "Failed to send message" });
        }
    });
};
//# sourceMappingURL=chat.js.map