import { useState, useEffect } from "react";
import { X, MapPin, Loader2 } from "lucide-react";
import apiClient from "@/axios/axios";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PostFormModal({ open, onClose, onSuccess }: Props) {
  const [hasMembership, setMembership] = useState<boolean>(false);
  const [note, setNote] = useState("");
  const [areaName, setAreaName] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [locDetected, setLocDetected] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  // sync mode → membership when modal reopens
  useEffect(() => {
    if (open) {
      setMembership(false);
      setSubmitted(false);
      setNote("");
      setLocDetected(false);
      setAreaName("");
      setSubmitError("");
    }
  }, [open]);

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const detectLocation = async () => {
    setLocLoading(true);
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej),
      );
      setLat(parseFloat(pos.coords.latitude.toFixed(6)));
      setLng(parseFloat(pos.coords.longitude.toFixed(6)));

      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
      );
      const data = await resp.json();
      const addr = data.address || {};
      const area = [
        addr.suburb || addr.neighbourhood,
        addr.city || addr.town || addr.village,
      ]
        .filter(Boolean)
        .join(", ");
      setAreaName(area || data.display_name?.split(",")[0] || "");
      setLocDetected(true);
    } catch {
      setAreaName("");
    } finally {
      setLocLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locDetected || lat === null || lng === null) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      await apiClient.post("/post/create", {
        note,
        lat,
        lng,
        hasMembership,
      });
      setSubmitted(true);
      onSuccess?.();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to create post. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#F7FBFC",
    border: "1.5px solid #d4eef4",
    borderRadius: "12px",
    padding: "11px 14px",
    fontSize: "14px",
    color: "#1a2e35",
    outline: "none",
    transition: "border-color 0.15s",
    appearance: "none",
  };
                
  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,46,53,0.45)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
        }}
      />

      {/* modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(480px, 94vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 24px 80px rgba(59,191,212,0.2)",
          zIndex: 101,
          border: "1px solid #e2f0f3",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 0",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a2e35",
                margin: 0,
              }}
            >
              Create a BOGO post
            </h2>
            <p style={{ fontSize: "13px", color: "#6b9eab", marginTop: "3px" }}>
              Tell hosts what you're looking for
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              border: "1.5px solid #e2f0f3",
              background: "#F7FBFC",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5a7a85",
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* progress bar */}
        <div style={{ padding: "16px 24px 0" }}>
          <div
            style={{
              height: "3px",
              background: "#e2f0f3",
              borderRadius: "99px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #3BBFD4, #F5903D)",
                borderRadius: "99px",
                width: submitted ? "100%" : locDetected ? "66%" : "33%",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* ── success state ─────────────────────────────────────── */}
        {submitted ? (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(59,191,212,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#3BBFD4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a2e35",
                marginBottom: "6px",
              }}
            >
              Post created!
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6b9eab",
                marginBottom: "24px",
              }}
            >
              People in your area can now find your post.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "linear-gradient(135deg, #3BBFD4, #2AA8B8)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 32px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          /* ── form ──────────────────────────────────────────────── */
          <form onSubmit={handleSubmit} style={{ padding: "20px 24px 24px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* role toggle */}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b9eab",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Do you have Membership?
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {[
                    { v: true, t: "Yes", s: "I'll host the BOGO" },
                    {
                      v: false,
                      t: "No",
                      s: "Looking for Gold member",
                    },
                  ].map((opt) => (
                    <button
                      key={String(opt.v)}
                      type="button"
                      onClick={() => setMembership(opt.v)}
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border: `1.5px solid ${hasMembership === opt.v ? "#3BBFD4" : "#e2f0f3"}`,
                        background:
                          hasMembership === opt.v
                            ? "rgba(59,191,212,0.06)"
                            : "#F7FBFC",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color:
                            hasMembership === opt.v ? "#2AA8B8" : "#1a2e35",
                          margin: 0,
                        }}
                      >
                        {opt.t}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#8aacb5",
                          margin: "2px 0 0",
                        }}
                      >
                        {opt.s}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* location */}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b9eab",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Your area
                </label>
                {locDetected ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "11px 14px",
                      background: "rgba(59,191,212,0.06)",
                      border: "1.5px solid rgba(59,191,212,0.3)",
                      borderRadius: "12px",
                    }}
                  >
                    <MapPin
                      size={15}
                      style={{ color: "#3BBFD4", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#2AA8B8",
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {areaName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setLocDetected(false);
                        setAreaName("");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "11px",
                        color: "#8aacb5",
                      }}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locLoading}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      background: "#F7FBFC",
                      border: "1.5px solid #d4eef4",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      fontSize: "13px",
                      color: "#5a7a85",
                      cursor: locLoading ? "not-allowed" : "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {locLoading ? (
                      <>
                        <Loader2
                          size={14}
                          style={{ animation: "spin 1s linear infinite" }}
                        />{" "}
                        Detecting...
                      </>
                    ) : (
                      <>
                        <MapPin size={14} /> Detect my location
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* note */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6b9eab",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Add a note
                  </label>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={280}
                  placeholder="Add a personal note about what you're looking for..."
                  style={{
                    ...inputStyle,
                    height: "88px",
                    resize: "none",
                    display: "block",
                    lineHeight: "1.5",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3BBFD4")}
                  onBlur={(e) => (e.target.style.borderColor = "#d4eef4")}
                />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#b8d4dc",
                    textAlign: "right",
                    marginTop: "4px",
                  }}
                >
                  {note.length}/280
                </p>
              </div>

              {/* submit */}
              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting || !locDetected}
                style={{
                  width: "100%",
                  padding: "13px",
                  background:
                    submitting || !locDetected
                      ? "#c8e8ee"
                      : "linear-gradient(135deg, #3BBFD4, #2AA8B8)",
                  color: submitting || !locDetected ? "#8aacb5" : "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor:
                    submitting || !locDetected ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow:
                    submitting || !locDetected
                      ? "none"
                      : "0 6px 18px rgba(59,191,212,0.3)",
                  transition: "all 0.15s",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={16}
                      style={{ animation: "spin 1s linear infinite" }}
                    />{" "}
                    Posting...
                  </>
                ) : !locDetected ? (
                  "Detect location to continue"
                ) : (
                  "Create post"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
