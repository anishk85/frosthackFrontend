"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { setToken } from "@/lib/slices/authSlice";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/api";

export default function OTPVerificationPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signupData = useSelector((state: RootState) => state.auth.signupData);

  if (!signupData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Session expired. Please restart the signup process.</p>
        <Button onClick={() => router.push("/signup")}>Go to Signup</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        ...signupData,
        otp,
      });

      const { token } = response.data;

      // Save token to Redux
      dispatch(setToken(token));

      // Redirect to chat page
      router.push("/chat");
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">OTP</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify & Register"}
        </Button>
      </form>
    </div>
  );
}