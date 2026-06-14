import { MapPin, BadgeCheck, MessageCircle, ArrowRight } from "lucide-react";
import { PostForUI } from "./PostSection";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import apiClient from "@/axios/axios";
import { useState } from "react";

export default function PostCard({ post }: { post: PostForUI }) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  const onConnect = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setConnecting(true);
    setError("");

    try {
      const response = await apiClient.post("deal/create", { postId: post.id });
      const dealId = String(response.data.data);
      navigate(`/chat/${dealId}`);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Could not start chat. Try again.";
      setError(message);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div
      className="bg-white rounded-[18px] border-[1.5px] border-[#e8f4f7] p-[18px]
                    transition-all duration-200 ease-in-out
                    hover:border-[#b8e5ed] hover:shadow-[0_8px_30px_rgba(59,191,212,0.12)]
                    hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`
            w-[42px] h-[42px] rounded-[13px] flex items-center justify-center
            text-white text-[13px] font-bold shrink-0
            ${
              post.teal
                ? "bg-gradient-to-br from-[#3BBFD4] to-[#2AA8B8]"
                : "bg-gradient-to-br from-[#F5903D] to-[#e07020]"
            }
          `}
          >
            {post.initials}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14px] font-bold text-[#1a2e35]">
              {post.name}
            </span>
            <BadgeCheck size={13} style={{ color: "#3BBFD4" }} />
          </div>
        </div>

        <span
          className={`
          text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0
          ${
            post.hasMembership
              ? "bg-[rgba(59,191,212,0.1)] text-[#2AA8B8] border border-[rgba(59,191,212,0.25)]"
              : "bg-[rgba(245,144,61,0.1)] text-[#F5903D] border border-[rgba(245,144,61,0.25)]"
          }
        `}
        >
          {post.hasMembership ? "Has Gold" : "Needs Host"}
        </span>
      </div>

      <p
        className="text-[13px] text-[#5a7a85] leading-[1.55] mb-3
                    line-clamp-2 overflow-hidden"
      >
        {post.note}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3.5">
        <span
          className="text-[11px] px-2.5 py-1 rounded-full bg-[#F7FBFC]
                         border border-[#e2f0f3] text-[#6b9eab]
                         flex items-center gap-1"
        >
          <MapPin size={9} /> {post.area}
        </span>
      </div>

      {error && (
        <p className="text-xs text-red-500 mb-2">{error}</p>
      )}

      <button
        className="w-full py-2.5 rounded-[11px] border-none
                   bg-gradient-to-r from-[#3BBFD4] to-[#2AA8B8]
                   text-white text-[13px] font-semibold cursor-pointer
                   flex items-center justify-center gap-1.5
                   shadow-[0_4px_12px_rgba(59,191,212,0.25)]
                   hover:shadow-[0_6px_18px_rgba(59,191,212,0.4)]
                   transition-all disabled:opacity-60"
        onClick={onConnect}
        disabled={connecting}
      >
        <MessageCircle size={14} />
        {connecting ? "Starting chat..." : isLoggedIn ? "Connect" : "Login to connect"}
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
