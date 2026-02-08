import { NextAuthOptions, DefaultSession } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

// --- 1. Type Augmentation (Fixes TS errors) ---
// You can move this to a separate types.d.ts file if you prefer
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isVerified: boolean;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    isVerified: boolean;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isVerified: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        // --- CHANGE 1: DO NOT BLOCK LOGIN ---
        // We comment this out so the user can log in and see the "Verify Email" page.
        // If you block them here, they can't access the "Resend Email" button.
        // if (!user.isVerified) throw new Error("Please verify your email first!");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
          isVerified: user.isVerified, // Pass this to the token
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        await dbConnect();
        
        let existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user?.image,
            password: null, 
            isVerified: true, // --- CHANGE 2: OAuth users are trusted/verified by default
          });
        }
        
        user.id = existingUser._id.toString();
        user.isVerified = existingUser.isVerified; // Ensure we pass this for the JWT
      }
      return true;
    },

    async jwt({ token, user }) {
      // 1. Initial Sign In (User object is available)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.isVerified = user.isVerified;
        token.role = user.role;
      }

      // --- CHANGE 3: Refresh Verification Status ---
      // This runs on every session check (e.g., page reload). 
      // We check the DB to see if the user has verified since logging in.
      if (!user) { // Only do this if we are not in the initial sign-in phase
        await dbConnect();
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.isVerified = dbUser.isVerified;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string | null;
        session.user.isVerified = token.isVerified; // Pass to client
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};