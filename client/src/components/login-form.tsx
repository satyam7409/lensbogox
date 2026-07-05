import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";
import { useState, useRef } from "react";
import {
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import apiClient from "@/axios/axios";
import { connectSocket } from "@/socket/socket";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  type Step = "phone" | "otp" | "form";

  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // User form fields
  const [username, setUsername] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [areaName, setAreaName] = useState<string>("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>("");

  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const confirmResultRef = useRef<ConfirmationResult | null>(null);

  // ── Step 1: send OTP ────────────────────────────────────────
  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" },
        );
      }

      console.log(" am here");

      const result = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        recaptchaRef.current,
      );
      console.log("result",result);      
      confirmResultRef.current = result;
      setStep("otp");
    } catch (err: any) {
      setError("Failed to send OTP. Try again.");
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify OTP ──────────────────────────────────────
  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmResultRef.current) return;
    setError("");
    setLoading(true);

    try {
      const credential = await confirmResultRef.current.confirm(otp);
      const idToken = await credential.user.getIdToken();
      setToken(idToken);
      setStep("form");
    } catch (err: any) {
      setError("Wrong OTP. Try again.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  // ── Get current location ────────────────────────────────────
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(parseFloat(position.coords.latitude.toFixed(6)));
        setLng(parseFloat(position.coords.longitude.toFixed(6)));
        setLocationLoading(false);
      },
      () => {
        setLocationError("Unable to retrieve location. Please allow access.");
        setLocationLoading(false);
      },
    );
  };

  // ── Step 3: submit user form ────────────────────────────────
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setError("Session expired. Please verify OTP again.");
        setStep("phone");
        return;
      }

      const idToken = await firebaseUser.getIdToken();
      const response = await apiClient.post("/user/login", {
        idToken,
        displayName: username,
        phone,
        location: [lng, lat],
        pincode,
        areaName,
      });
      const data = response.data.data;
      setToken(idToken);
      setUser({
        _id: data._id,
        phone: data.phone,
        displayName: data.displayName,
        avatarInitials: data.avatarInitials,
        areaName: data.areaName,
        pinCode: data.pinCode,
        hasMembership: data.hasMembership,
      });
      connectSocket(idToken);
      navigate("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Shared form wrapper classes — fills the card height consistently
  const formClass =
    "p-6 md:p-8 flex flex-col gap-4 min-h-[420px] justify-center";

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* ── Phone step ── */}
          {step === "phone" && (
            <form className={formClass} onSubmit={sendOtp}>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome to LenBogo</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your phone number to continue
                </p>
              </div>

              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                required
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" disabled={loading || phone.length !== 10}>
                {loading ? "Sending..." : "Get OTP"}
              </Button>
            </form>
          )}

          {/* ── OTP step ── */}
          {step === "otp" && (
            <form className={formClass} onSubmit={verifyOtp}>
              <div>
                <h1 className="text-2xl font-bold">Enter OTP</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Sent to +91 {phone}
                </p>
              </div>

              <Input
                type="tel"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" disabled={loading || otp.length !== 6}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                  confirmResultRef.current = null;
                  recaptchaRef.current = null;
                }}
              >
                ← Change number
              </button>
            </form>
          )}

          {/* ── User details form (after OTP verified) ── */}
          {step === "form" && (
            <form className={formClass} onSubmit={submitForm}>
              <div>
                <h1 className="text-2xl font-bold">Complete your profile</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Just a few more details
                </p>
              </div>

              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                required
              />

              <Input
                type="text"
                placeholder="Area name"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                required
              />

              {/* Location row */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                    className="shrink-0"
                  >
                    {locationLoading
                      ? "Locating..."
                      : "📍 Use current location"}
                  </Button>

                  {lat !== null && lng !== null && (
                    <span className="text-xs text-muted-foreground truncate">
                      {lat}, {lng}
                    </span>
                  )}
                </div>

                {locationError && (
                  <p className="text-xs text-red-500">{locationError}</p>
                )}
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={
                  loading ||
                  !username ||
                  pincode.length !== 6 ||
                  !areaName ||
                  lat === null ||
                  lng === null
                }
              >
                {loading ? "Saving..." : "Continue →"}
              </Button>
            </form>
          )}

          {/* ── Side image ── */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="logo.png"
              // src="logo."
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>

      <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>

      <div id="recaptcha-container" />
    </div>
  );
}
