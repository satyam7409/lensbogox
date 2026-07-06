import { useEffect, useState, useMemo, useCallback } from "react"
import { BadgeCheck, Search } from "lucide-react"
import Navbar from "@/components/Navbar"
import ChatBox from "@/components/ChatBox"
import socket, { joinDealRoom, onSocketReconnect, onNewDeal } from "@/socket/socket"
import apiClient from "@/axios/axios"
import { useAuthStore } from "@/store/auth.store"
import { useParams } from "react-router-dom"

export interface Message {
  _id:       string
  dealId:    string
  senderId:  string | { _id: string; displayName: string; avatarInitials: string }
  content:   string
  isRead?:   boolean
  createdAt: string
}

export interface Chat {
  id:            string
  hasMembership: boolean
  name:          string
  area:          string
  initials:      string
  teal:          boolean
  time:          string
  lastMessage:   string
  unread:        number
}

interface DealFromAPI {
  _id:    string
  postId: { areaName: string; hasMembership: boolean } | null
  hostUserId: {
    _id:            string
    displayName:    string
    avatarInitials: string
    hasMembership:  boolean
  }
  joinerUserId: {
    _id:            string
    displayName:    string
    avatarInitials: string
    hasMembership:  boolean
  }
  status:    string
  updatedAt: string
}

const transformDeal = (deal: DealFromAPI, currentUserId: string): Chat => {
  const uid = String(currentUserId)
  const isHost  = String(deal.hostUserId._id) === uid
  const partner = isHost ? deal.joinerUserId : deal.hostUserId

  return {
    id:            String(deal._id),
    name:          partner.displayName,
    initials:      partner.avatarInitials ||
                   partner.displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
    hasMembership: partner.hasMembership,
    area:          deal.postId?.areaName || "",
    teal:          partner.hasMembership,
    lastMessage:   "No messages yet",
    time:          "",
    unread:        0,
  }
}

const PLACEHOLDER_CHAT = (id: string): Chat => ({
  id: String(id),
  name:          "Loading...",
  initials:      "...",
  hasMembership: false,
  area:          "",
  teal:          true,
  time:          "",
  lastMessage:   "",
  unread:        0,
})

export default function ChatPage() {
  const { dealID } = useParams<{ dealID?: string }>();
  const [activeId,   setActiveId]   = useState<string | null>(dealID ?? null)
  const [chats,      setChats]      = useState<Chat[]>([])
  const [search,     setSearch]     = useState("")
  const [mobileView, setMobileView] = useState<"list" | "chat">(
    dealID ? "chat" : "list"
  )

  const currentUserId = useAuthStore(s => s.user?._id)
  const activeChat    = chats.find(c => c.id === activeId) ?? null

  const chatToShow = useMemo(() => {
    if (activeChat) return activeChat
    if (activeId) return PLACEHOLDER_CHAT(activeId)
    return null
  }, [activeChat, activeId])

  const fetchChats = useCallback(async () => {
    if (!currentUserId) return

    try {
      const response = await apiClient.get("deal/getdeals")
      const deals    = response.data.data as DealFromAPI[]
      const transformed = deals.map(d => transformDeal(d, currentUserId))
      setChats(transformed)
    } catch {
      // deal list unavailable
    }
  }, [currentUserId])

  useEffect(() => {
    if (dealID) {
      setActiveId(dealID)
      setMobileView("chat")
    }
  }, [dealID])

  const selectChat = (chat: Chat) => {
    setActiveId(chat.id)
    setMobileView("chat")
  }

  // Load conversations + refresh when someone new connects to your post
  useEffect(() => {
    if (!currentUserId) return

    fetchChats()
    const unsub = onNewDeal(fetchChats)
    const interval = setInterval(fetchChats, 15_000)

    return () => {
      unsub()
      clearInterval(interval)
    }
  }, [currentUserId, fetchChats])

  useEffect(() => {
    if (!activeId) return

    const join = () => joinDealRoom(activeId)
    join()
    const unsub = onSocketReconnect(join)

    return () => {
      unsub()
      socket.emit("leave_room", { dealId: activeId })
    }
  }, [activeId])

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.area.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden"
         style={{ background: "#F7FBFC" }}>
      <Navbar />

      <div className="flex flex-1 pt-[60px] max-w-[1200px] mx-auto w-full
                      px-4 md:px-6 py-4 gap-4 min-h-0 mt-5">

        <aside className={`
          flex-col w-full md:w-[320px] md:flex-shrink-0 rounded-2xl overflow-hidden
          border border-[#e2f0f3] bg-white min-h-0
          ${mobileView === "list" ? "flex" : "hidden md:flex"}
        `}>
          <div className="px-5 pt-5 pb-4 border-b border-[#f0f8fb]">
            <h2 className="text-base font-bold text-[#1a2e35] mb-3">Messages</h2>
            {/* <p className="text-[11px] text-[#8aacb5] mb-3">
              Each person who connects gets their own chat with you
            </p> */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2
                                           text-[#8aacb5] pointer-events-none" />
              <input
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-[13px]
                           bg-[#F7FBFC] border border-[#e2f0f3] text-[#1a2e35]
                           placeholder-[#8aacb5] outline-none focus:border-[#3BBFD4]
                           transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <p className="text-center text-[13px] text-[#8aacb5] py-10 px-4">
                No chat yet. 
                {currentUserId && " Create or Join post to start chat."}
              </p>
            ) : (
              filteredChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => selectChat(chat)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3.5 text-left
                    transition-all border-b border-[#f8fcfd] last:border-none
                    ${activeId === chat.id
                      ? "bg-[rgba(59,191,212,0.06)] border-l-2 border-l-[#3BBFD4]"
                      : "hover:bg-[#F7FBFC]"
                    }
                  `}
                >
                  <div className={`
                    w-11 h-11 rounded-[14px] flex items-center justify-center
                    text-white text-[13px] font-bold shrink-0
                    ${chat.teal
                      ? "bg-gradient-to-br from-[#3BBFD4] to-[#2AA8B8]"
                      : "bg-gradient-to-br from-[#F5903D] to-[#e07020]"
                    }
                  `}>
                    {chat.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-semibold text-[#1a2e35] truncate">
                          {chat.name}
                        </span>
                        {chat.hasMembership && (
                          <BadgeCheck size={12} style={{ color: "#3BBFD4", flexShrink: 0 }} />
                        )}
                      </div>
                      <span className="text-[10px] text-[#8aacb5] shrink-0 ml-1">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] text-[#8aacb5] truncate flex-1">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#3BBFD4] text-white
                                         text-[10px] font-bold flex items-center
                                         justify-center shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        <main className={`
          flex-1 flex flex-col rounded-2xl overflow-hidden
          border border-[#e2f0f3] bg-white min-h-[calc(100vh-100px)]
          ${mobileView === "chat" ? "flex" : "hidden md:flex"}
        `}>
          {chatToShow ? (
            <ChatBox
              chat={chatToShow}
              onBack={() => setMobileView("list")}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center
                            text-[#8aacb5] text-[13px] px-6 text-center">
            No Messages
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
