import { MessageCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { disConnectSocket } from "@/socket/socket";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = !!user;
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    disConnectSocket();
    logout();
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "rgba(247,251,252,0.85)",
        borderBottom: "1px solid #e2f0f3",
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center
                   justify-between px-6 md:px-12 py-3.5 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-3"
      >
        <img
          src="/remove.png"
          alt="LensBogo"
          className="w-11 h-11 md:w-12 md:h-12 object-contain shrink-0"
        />
        <span
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: "#1a2e35" }}
        >
          Lens<span style={{ color: "#F5903D" }}>Bogo</span>
        </span>
      </button>

      <div className="flex items-center gap-1">
        {isLoggedIn && (
          <>
            <span className="hidden sm:inline text-xs text-[#6b9eab] mr-2">
              {user?.displayName}
            </span>
            <button
              onClick={() => navigate("/chat")}
              title="Chats"
              style={{ color: "#5a7a85" }}
              className="w-9 h-9 flex items-center justify-center rounded-xl
                       hover:bg-teal-50 transition-colors"
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{ color: "#5a7a85" }}
              className="w-9 h-9 flex items-center justify-center rounded-xl
                       hover:bg-teal-50 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-white text-xs font-semibold
                       px-4 py-2 rounded-xl transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #3BBFD4, #2AA8B8)",
              boxShadow: "0 4px 14px rgba(59,191,212,0.3)",
            }}
          >
            Get started
          </button>
        )}
      </div>
    </nav>
  );
}
