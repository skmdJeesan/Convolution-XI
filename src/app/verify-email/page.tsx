"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // <--- Import signOut

const VerifyPageContent = () => {
  const [status, setStatus] = useState<"verifying" | "success" | "error" | "waiting">("waiting");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { data: session } = useSession();

  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage("");
    try {
      const res = await fetch("/api/user/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      if (res.ok) setResendMessage("Verification email sent!");
      else setResendMessage("Failed to send email.");
    } catch (err) {
      setResendMessage("Something went wrong.");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (session?.user?.isVerified) {
      router.push("/"); 
    }
  }, [session, router]);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("waiting"); 
        return;
      }
      setStatus("verifying");
      try {
        const res = await fetch("/api/user/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.push("/login"), 3000); 
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };
    verifyToken();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="glassmorphism-bg rounded-2xl p-8 shadow-md text-center max-w-md w-full border border-gray-800">
        
        {status === "waiting" && (
          <div>
             <h1 className="text-2xl font-orbitron text-white font-bold mb-4">Check your email</h1>
             <p className="text-gray-400 font-rajdhani text-sm font-medium mb-6">
               We've sent a verification link to <br/>
               <span className="text-white font-rajdhani">{session?.user?.email}</span>
             </p>
             
             <button
               onClick={handleResendEmail}
               disabled={isResending}
               className="w-full px-4 py-2 bg-blue-600 text-white font-orbitron font-base font-medium  rounded hover:bg-blue-700 disabled:opacity-50 transition mb-4"
             >
               {isResending ? "Sending..." : "Resend Verification Email"}
             </button>
             
             {resendMessage && <p className="text-sm text-gray-400 mb-4">{resendMessage}</p>}

             {/* what if the user registerd with wrong gmail or typo */}
             <div className="border-t border-gray-700 pt-4 mt-4">
               <p className="text-gray-400 font-rajdhani text-sm font-medium mb-2">Did you enter the wrong email?</p>
               <button
                 onClick={() => signOut({ callbackUrl: "/register" })} 
                 className="font-orbitron font-medium text-sm text-red-400 hover:text-red-300 hover:underline"
               >
                 Log out & Register again
               </button>
             </div>

          </div>
        )}

        {status === "verifying" && <p className="text-white">Verifying your token...</p>}

        {status === "success" && (
          <div>
            <h1 className="text-2xl text-green-500 font-bold mb-2">Verified!</h1>
            <p className="text-gray-300">Redirecting to login...</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <h1 className="text-2xl text-red-500 font-bold mb-2">Verification Failed</h1>
            <p className="text-gray-300 mb-6">Token invalid or expired.</p>
            <div className="flex flex-col gap-2">
                <button
                onClick={() => setStatus("waiting")} 
                className="text-blue-400 hover:underline"
                >
                &larr; Try Resending
                </button>
                {/* Allow logout even on error screen */}
                <button
                 onClick={() => signOut({ callbackUrl: "/register" })} 
                 className="text-sm text-gray-500 hover:text-white"
               >
                 Log out
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}