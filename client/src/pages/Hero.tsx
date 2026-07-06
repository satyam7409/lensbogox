import {
  MessageCircle,
  MapPin,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PostFormModal from "@/components/PostFormModal";
import { useState } from "react";
import PostsSection from "@/components/PostSection";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/auth.store";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [postsRefreshKey, setPostsRefreshKey] = useState(0);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;

  const scrollToPosts = () => {
    document.getElementById("posts-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openPostModal = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setModalOpen(true);
  };

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: "#F7FBFC", color: "#1a2e35" }}
    >
      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            {/* pill */}
            <div className="flex">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1
                           rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(245,144,61,0.1)",
                  color: "#F5903D",
                  border: "1px solid rgba(245,144,61,0.25)",
                }}
              >
                <Zap size={11} style={{ fill: "#F5903D" }} />
                Save up to 50% on Lenskart specs
              </span>
            </div>

            {/* heading */}
            <div>
              <h1
                className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold
                           leading-[1.1] tracking-tight"
                style={{ color: "#1a2e35" }}
              >
                Find your BOGO
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #3BBFD4, #F5903D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  partner
                </span>{" "}
                <span style={{ color: "#1a2e35" }}>nearby</span>
              </h1>
              <p
                className="mt-4 text-base md:text-lg leading-relaxed max-w-sm"
                style={{ color: "#5a7a85" }}
              >
                Team up with someone in your area. Use Lenskart Gold's Buy One
                Get One deal — both of you pay half the price.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToPosts}
                className="flex items-center justify-center gap-2 px-6 h-12
                           rounded-xl text-white text-sm font-semibold
                           transition-all active:scale-[0.98] group"
                style={{
                  background: "linear-gradient(135deg, #3BBFD4, #2AA8B8)",
                  boxShadow: "0 6px 20px rgba(59,191,212,0.35)",
                }}
              >
                Get BOGO
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <button
                onClick={openPostModal}
                className="flex items-center justify-center gap-2 px-6 h-12
                           rounded-xl text-sm font-semibold transition-all
                           active:scale-[0.98]"
                style={{
                  background: "white",
                  color: "#2AA8B8",
                  border: "1.5px solid #b8e5ed",
                  boxShadow: "0 2px 8px rgba(59,191,212,0.1)",
                }}
              >
                Post BOGO
              </button>
            </div>

            {/* trust / stats strip — fills the empty space under CTAs */}
            {/* <div
              className="flex items-center gap-5 sm:gap-7 pt-5 mt-1 flex-wrap"
              style={{ borderTop: "1px solid #e2f0f3" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#3BBFD4", "#F5903D", "#2AA8B8", "#e07020"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#5a7a85" }}
                >
                  1,200+ matched
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Star size={14} style={{ fill: "#F5903D", color: "#F5903D" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#5a7a85" }}
                >
                  4.8 rating
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users size={14} style={{ color: "#3BBFD4" }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#5a7a85" }}
                >
                  Active in 30+ cities
                </span>
              </div>
            </div> */}
          </div>

          {/* Right — hero visual */}
          <div className="flex items-center justify-center w-full order-1 md:order-2 min-h-[360px] md:min-h-0">
            <div className="relative flex items-center justify-center w-full max-w-[520px] aspect-square mx-auto">
              {/* soft glow */}
              <div
                className="absolute inset-[8%] rounded-full blur-3xl opacity-60 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,191,212,0.35), rgba(245,144,61,0.2), transparent 72%)",
                }}
              />

              {/* decorative rings */}
              <div
                className="absolute inset-[12%] rounded-full border border-[#e2f0f3]/80 pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute inset-[22%] rounded-full border border-[#e8f4f7]/60 pointer-events-none"
                aria-hidden
              />

              {/* logo */}
              {/* <img
                src="/remove.png"
                alt="LensBogo — BOGO partner matching"
                className="relative z-10 w-[62%] max-w-[340px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(59,191,212,0.18)]"
              /> */}

              {/* logo */}
<img
  src="/remove.png"
  alt="LensBogo — BOGO partner matching"
  className="relative z-10 w-[62%] max-w-[340px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(59,191,212,0.18)] transition-transform duration-500 ease-out hover:scale-[1.035] hover:drop-shadow-[0_24px_48px_rgba(59,191,212,0.26)] motion-reduce:transition-none motion-reduce:hover:scale-100"
/>

              {/* floating savings badge */}
              <div
                className="absolute z-20 text-white text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap"
                style={{
                  top: "6%",
                  right: "2%",
                  background: "linear-gradient(135deg, #F5903D, #e07020)",
                  boxShadow: "0 6px 20px rgba(245,144,61,0.45)",
                }}
              >
                ₹1,200 saved!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTS SECTION ─────────────────────────────────────── */}
      {isLoggedIn ? <PostsSection refreshKey={postsRefreshKey} /> : <></>}

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 lg:px-20 py-20"
        style={{ borderTop: "1px solid #e2f0f3" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#3BBFD4" }}
            >
              How it works
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#1a2e35" }}
            >
              Three steps to save half
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Post or browse",
                desc: "Post that you need a BOGO partner, or browse posts from people in your area.",
                icon: MapPin,
                teal: true,
              },
              {
                num: "02",
                title: "Match and chat",
                desc: "Send a partner request. When accepted, chat to plan your meetup at Lenskart.",
                icon: MessageCircle,
                teal: false,
              },
              {
                num: "03",
                title: "Buy together",
                desc: "Meet at Lenskart, place the BOGO order together. Both of you pay half.",
                icon: CheckCircle2,
                teal: true,
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-2xl p-6 transition-all hover:-translate-y-0.5"
                style={{
                  background: "white",
                  border: "1px solid #e2f0f3",
                  boxShadow: "0 4px 20px rgba(59,191,212,0.07)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={
                      item.teal
                        ? {
                            background: "rgba(59,191,212,0.1)",
                            color: "#3BBFD4",
                          }
                        : {
                            background: "rgba(245,144,61,0.1)",
                            color: "#F5903D",
                          }
                    }
                  >
                    <item.icon size={18} />
                  </div>
                  <span
                    className="text-3xl font-black select-none"
                    style={{ color: "#e8f4f7" }}
                  >
                    {item.num}
                  </span>
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "#1a2e35" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6b8f9a" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-20">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, #3BBFD4 0%, #2AA8B8 50%, #F5903D 100%)",
            boxShadow: "0 20px 60px rgba(59,191,212,0.3)",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to save on specs?
          </h2>
          <p className="text-white/80 text-sm mb-8">
            Join thousands saving on Lenskart BOGO deals right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToPosts}
              className="flex items-center justify-center gap-2 px-8 h-12
                         rounded-xl text-sm font-semibold transition-all
                         active:scale-[0.98] group"
              style={{
                background: "white",
                color: "#2AA8B8",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              Get BOGO now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <button
              onClick={openPostModal}
              className="flex items-center justify-center gap-2 px-8 h-12
                         rounded-xl text-sm font-semibold transition-all
                         active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.4)",
              }}
            >
              Post a BOGO
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer
        className="px-6 md:px-12 py-8"
        style={{ borderTop: "1px solid #e2f0f3" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/remove.png"
              alt="LensBogo"
              className="w-10 h-10 md:w-11 md:h-11 object-contain shrink-0"
            />
            <span
              className="text-base md:text-lg font-bold"
              style={{ color: "#1a2e35" }}
            >
              Lens<span style={{ color: "#F5903D" }}>Bogo</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: "#8aacb5" }}>
            © 2026 LensBogo. Not affiliated with Lenskart.
          </p>
        </div>
      </footer>

      {/* ── MODAL ─────────────────────────────────────────────── */}
      <PostFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setPostsRefreshKey((k) => k + 1)}
      />
    </div>
  );
}
