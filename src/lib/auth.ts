import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import googleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

const authOptions:NextAuthOptions = {
  providers: [
    // Add your authentication providers here
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement your authorization logic here
        let { email, password } = credentials as { email: string; password: string };
        if(!email || !password) return null

        await dbConnect() // safe to call every time

        // fetch user from DB here
        let user = await User.findOne({ email })
        if(!user) return null

        // if valid → return user
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return null

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        }
      }
    }),

    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    
  ],
  callbacks: {
    async signIn({user, account}) {
      // You can add additional sign-in logic here if needed
      if(account?.provider === 'google' || account?.provider === 'github') {
        await dbConnect() // safe to call every time
        // Check if user already exists
        let existingUser = await User.findOne({ email: user.email });
        if(!existingUser) {
          // If not, create a new user
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user?.image,
            password: null, // No password for OAuth users
          });
        }
        user.id = existingUser._id.toString();
      }
      return true;
    },
    // Example: Customize the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    // Example: Customize the session object
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: token.image as string | null,
        };
      }
      return session;
    }
  },
  session: {
    // Use JWT for session instead of database sessions
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
}
export { authOptions } 