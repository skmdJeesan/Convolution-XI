"use client";
import FlipLink from '@/components/FlipLink';
import '../register/register.css'
import DecorativeIcons from "@/components/DecorativeIcons";
import Loader from '@/components/Loader';
import Particles from "@/components/Particles";
import { useState, FormEvent } from "react";



export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) {
        setMessage("If an account exists, an email has been sent.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <Particles />
      <div className="tech-grid pointer-events-none" /> {/* Grid Background */}
      <DecorativeIcons />
      <div className="w-full max-w-sm glassmorphism-bg p-6 rounded-2xl shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full rounded-lg p-2 text-black glass-btn outline-none focus:ring-1 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg p-2 glass-btnn disabled:opacity-50"
          >
            {isSubmitting ? <Loader /> : <FlipLink>Send&nbsp;Reset&nbsp;Link</FlipLink>}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}