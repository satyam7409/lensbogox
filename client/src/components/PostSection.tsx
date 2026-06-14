import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PostCard from "./PostCard";
import { useEffect } from "react";
import apiClient from "@/axios/axios";

interface PostFromAPI {
  _id: string;
  userId: {
    displayName: string;
  };
  hasMembership: boolean;
  note: string;
  areaName: string;
}

interface PostForUI {
  id: string;
  initials: string;
  name: string;
  area: string;
  hasMembership: boolean;
  note: string;
  teal: boolean;
}

export default function PostsSection({ refreshKey = 0 }: { refreshKey?: number }) {
  const [filter, setFilter] = useState<"all" | "host" | "joiner">("all");
  const [posts, setPosts] = useState<PostForUI[]>([]);

  const filtered = posts.filter((p) =>
    filter === "all"
      ? true
      : filter === "host"
        ? p.hasMembership
        : !p.hasMembership,
  );

  const transformPost = (post: PostFromAPI): PostForUI => ({
    id: post._id,
    initials: post.userId.displayName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    name: post.userId.displayName,
    area: post.areaName,
    hasMembership: post.hasMembership,
    note: post.note,
    teal: post.hasMembership,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/post/posts");
        const transformed = (response.data.data as PostFromAPI[]).map(
          transformPost,
        );
        setPosts(transformed);
      } catch {
        // posts fetch failed silently — UI shows empty state
      }
    };
    fetchData();
  }, [refreshKey]);
  // if not logged in → save where user wanted to go, redirect to login

  return (
    <section
      id="posts-section"
      className="border-t border-[#e2f0f3] py-16 md:py-20"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* heading */}
        <div className="mb-8">
          <p className="text-[11px] font-bold text-[#3BBFD4] tracking-[0.1em] uppercase mb-2">
            Live posts near you
          </p>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e35] m-0">
              People looking right now
            </h2>
            <div className="flex items-center gap-1.5 pb-1">
              <span className="w-2 h-2 rounded-full bg-[#3BBFD4] shadow-[0_0_0_3px_rgba(59,191,212,0.2)] animate-pulse inline-block" />
              <span className="text-xs text-[#6b9eab]">
                {posts.length} active posts
              </span>
            </div>
          </div>
        </div>

        {/* filter pills */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(
            [
              { v: "all", l: "All posts" },
              { v: "host", l: "Has Gold" },
              { v: "joiner", l: "Needs host" },
            ] as const
          ).map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v)}
              className={`
                px-4 py-1.5 rounded-full text-[13px] transition-all whitespace-nowrap
                border-[1.5px] cursor-pointer
                ${
                  filter === f.v
                    ? "border-[#3BBFD4] bg-[rgba(59,191,212,0.08)] font-semibold text-[#2AA8B8]"
                    : "border-[#d4eef4] bg-white font-normal text-[#5a7a85]"
                }
              `}
            >
              {f.l}
            </button>
          ))}
        </div>

        {/* grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[15px] text-[#8aacb5]">
              No posts match your filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post) => (              
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* see all */}
        {filtered.length > 0 && (
          <div className="text-center mt-9">
            <button
              className="px-7 py-2.5 rounded-xl border-[1.5px] border-[#b8e5ed]
                               bg-white text-[13px] font-semibold text-[#2AA8B8]
                               inline-flex items-center gap-1.5 cursor-pointer
                               shadow-[0_2px_8px_rgba(59,191,212,0.1)]
                               hover:bg-[rgba(59,191,212,0.05)] transition-all"
            >
              See all posts <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export { PostForUI };
