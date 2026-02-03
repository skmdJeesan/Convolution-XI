import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define Public Routes
  // CRITICAL: We MUST add '/verify-email' here. 
  // If we don't, the middleware will try to redirect the user to '/verify-email', 
  // catch them again, and redirect them again endlessly (Infinite Loop).
  const publicRoutes = [
    '/login', 
    '/register', 
    '/api/auth', 
    '/favicon.ico', 
    '/_next', 
    '/forget-password', 
    '/reset-password', 
    '/verify-email' // <--- Added this
  ];

  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));
  const isHomePage = pathname === '/';

  // 2. Public Access Check
  // If it's a public route or the home page, let them pass immediately.
  if (isPublicRoute || isHomePage) {
    return NextResponse.next();
  }

  // 3. Get Token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // 4. Unauthorized Check (No User)
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Verification Check (User exists, but is they verified?)
  // We already know this is NOT a public route (step 2), so we must protect it.
  if (!token.isVerified) {
    // Redirect unverified users to the verification page
    return NextResponse.redirect(new URL('/verify-email', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|node_modules|.*\\..*).*)',
  ],
};