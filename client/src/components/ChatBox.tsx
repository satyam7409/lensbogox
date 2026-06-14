import { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowLeft, Send, BadgeCheck, CheckCheck, Check, MoreVertical, Phone,
} from "lucide-react"
import socket, { joinDealRoom, onSocketReconnect, syncSocketWithAuth } from "@/socket/socket"
import { Chat, Message } from "@/pages/ChatPage"
import apiClient from "@/axios/axios"
import { useAuthStore } from "@/store/auth.store"
import { useSocketStatus } from "@/hooks/useSocketStatus"

interface ChatBoxProps {
  chat: Chat
  onBack: () => void
  onNewMessage?: (msg: Message) => void
}

const normalizeMessage = (raw: Message): Message => ({
  ...raw,
  _id: String(raw._id),
  dealId: String(raw.dealId),
  senderId:
    typeof raw.senderId === "object"
      ? { ...raw.senderId, _id: String(raw.senderId._id) }
      : String(raw.senderId),
})

export default function ChatBox({ chat, onBack, onNewMessage }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [sendError, setSendError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const socketConnected = useSocketStatus()

  const currentUserId = useAuthStore(s => s.user?._id)
  const dealId = String(chat.id)

  const addMessage = useCallback(
    (raw: Message) => {
      const msg = normalizeMessage(raw)
      if (String(msg.dealId) !== dealId) return

      setMessages(prev => {
        if (prev.some(m => m._id === msg._id)) return prev
        return [...prev, msg]
      })
      onNewMessage?.(msg)
    },
    [dealId, onNewMessage],
  )

  const joinRoom = useCallback(() => {
    joinDealRoom(dealId)
  }, [dealId])

  useEffect(() => {
    if (!dealId) return

    const fetchMessages = async () => {
      try {
        const response = await apiClient.get(`messages/${dealId}`)
        const history = (response.data.data ?? []).map(normalizeMessage)
        setMessages(history)
      } catch {
        // message history unavailable
      }
    }
    fetchMessages()
  }, [dealId])

  // Join room on mount, socket connect, and reconnect
  useEffect(() => {
    joinRoom()
    const unsub = onSocketReconnect(joinRoom)
    return unsub
  }, [joinRoom])

  useEffect(() => {
    const handleReceive = (raw: Message) => addMessage(raw)

    socket.on("receive_message", handleReceive)
    return () => {
      socket.off("receive_message", handleReceive)
    }
  }, [addMessage])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return

    if (!socket.connected) {
      await syncSocketWithAuth()
      if (!socket.connected) {
        setSendError("Connecting to chat server… try again in a moment")
        return
      }
    }

    setSendError("")
    setInput("")

    socket.emit(
      "send_message",
      { dealId, content: text },
      (res: { ok?: boolean; message?: Message; error?: string } | undefined) => {
        if (res?.ok && res.message) {
          addMessage(res.message)
        } else if (!res?.ok) {
          setSendError(res?.error ?? "Failed to send")
          setInput(text)
        }
      },
    )
  }

  const isMyMessage = (msg: Message) => {
    const senderId =
      typeof msg.senderId === "object"
        ? msg.senderId._id
        : msg.senderId
    return String(senderId) === String(currentUserId)
  }

  const formatTime = (createdAt: string) =>
    new Date(createdAt).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f8fb] bg-white shrink-0">
        <button onClick={onBack}
                className="md:hidden w-8 h-8 flex items-center justify-center
                           rounded-xl text-[#5a7a85] hover:bg-[#F7FBFC] transition-colors">
          <ArrowLeft size={18} />
        </button>

        <div className={`
          w-10 h-10 rounded-[13px] flex items-center justify-center
          text-white text-[13px] font-bold shrink-0
          ${chat.teal
            ? "bg-gradient-to-br from-[#3BBFD4] to-[#2AA8B8]"
            : "bg-gradient-to-br from-[#F5903D] to-[#e07020]"
          }
        `}>
          {chat.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-bold text-[#1a2e35]">{chat.name}</span>
            {chat.hasMembership && <BadgeCheck size={13} style={{ color: "#3BBFD4" }} />}
          </div>
          <p className="text-[11px] text-[#8aacb5]">
            {chat.area || "LensBogo chat"}
            {!socketConnected && (
              <span className="text-[#F5903D]"> · reconnecting…</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-xl
                             text-[#5a7a85] hover:bg-[#F7FBFC] transition-colors">
            <Phone size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl
                             text-[#5a7a85] hover:bg-[#F7FBFC] transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-2" style={{ background: "#F7FBFC" }}>
        {messages.length === 0 && (
          <p className="text-center text-[13px] text-[#8aacb5] py-8">
            No messages yet. Say hello!
          </p>
        )}

        {messages.map((msg, i) => {
          const isMe = isMyMessage(msg)
          const showTime =
            i === 0 ||
            formatTime(messages[i - 1].createdAt) !== formatTime(msg.createdAt)

          return (
            <div key={msg._id}>
              {showTime && (
                <div className="flex items-center justify-center my-3">
                  <span className="text-[10px] text-[#8aacb5] bg-white px-3 py-1 rounded-full border border-[#e2f0f3]">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              )}

              <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`
                  max-w-[72%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed
                  ${isMe
                    ? "bg-gradient-to-br from-[#3BBFD4] to-[#2AA8B8] text-white rounded-br-sm"
                    : "bg-white text-[#1a2e35] border border-[#e2f0f3] rounded-bl-sm"
                  }
                `}>
                  <p>{msg.content}</p>
                  {isMe && (
                    <div className="flex justify-end mt-1">
                      {msg.isRead
                        ? <CheckCheck size={11} className="text-white/70" />
                        : <Check size={11} className="text-white/50" />
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-[#f0f8fb] bg-white shrink-0">
        {sendError && (
          <p className="text-xs text-red-500 mb-2">{sendError}</p>
        )}
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-[#F7FBFC] border border-[#e2f0f3] rounded-2xl
                     px-4 py-2.5 text-[13px] text-[#1a2e35] placeholder-[#8aacb5]
                     resize-none outline-none max-h-28
                     focus:border-[#3BBFD4] transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-2xl flex items-center justify-center
                     shrink-0 transition-all active:scale-95 disabled:opacity-40"
            style={{
              background: input.trim() ? "linear-gradient(135deg, #3BBFD4, #2AA8B8)" : "#e2f0f3",
              boxShadow: input.trim() ? "0 4px 12px rgba(59,191,212,0.3)" : "none",
            }}
          >
            <Send size={16} className={input.trim() ? "text-white" : "text-[#8aacb5]"} />
          </button>
        </div>
      </div>
    </>
  )
}
