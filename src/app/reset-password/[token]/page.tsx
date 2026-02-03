"use client";
import { useState, use } from "react";
import { useRouter } from "next/navigation";

interface ResetPasswordProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPassword({ params }: ResetPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
 const { token } = use(params);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Error resetting password");
    }
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10 ">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}