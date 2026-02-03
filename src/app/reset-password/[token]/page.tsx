"use client";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import FlipLink from "@/components/FlipLink";
import Loader from "@/components/Loader";
import Particles from "@/components/Particles";
import DecorativeIcons from "@/components/DecorativeIcons";
import "../../register/register.css";

interface ResetPasswordProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPassword({ params }: ResetPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { token } = use(params);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      router.push("/login");
      setIsSubmitting(false);
    } else {
      alert("Error resetting password");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <Particles />
      <div className="tech-grid pointer-events-none" /> {/* Grid Background */}
      <DecorativeIcons />
      <div className="w-full max-w-sm glassmorphism-bg p-6 rounded-2xl shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Enter your new password
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg p-2 text-black glass-btn outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full rounded-lg p-2 glass-btnn disabled:opacity-50"
          >
            {isSubmitting ? <Loader /> : <FlipLink>Update&nbsp;Password</FlipLink>}
          </button>
        </form>
      </div>
    </div>
  );
}