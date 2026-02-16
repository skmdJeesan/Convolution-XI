"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const VerifyEmailRequest = () => {
  const { data: session } = useSession();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleResendEmail = async () => {
    setIsSending(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      
      if (res.ok) {
        setMessage("Verification email sent!");
      } else {
        setMessage("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  // If user is already verified, don't show this component
  // Note: You need to expose 'isVerified' in your NextAuth session (see Step 6)
  if (session?.user?.isVerified) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h1 className="text-xl font-bold text-yellow-800 mb-2">Verify your Email</h1>
      <p className="text-yellow-700 mb-4">
        You need to verify your email to access all features.
      </p>
      <button
        onClick={handleResendEmail}
        disabled={isSending}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
      >
        {isSending ? "Sending..." : "Resend Verification Email"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default VerifyEmailRequest;