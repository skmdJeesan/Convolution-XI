import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define Public Routes
  const publicRoutes = [
    '/login', 
    '/register', 
    '/api/auth', 
    '/favicon.ico', 
    '/forget-password', 
    '/reset-password', 
    '/verify-email' 
  ];

  // Helper to check if the current path is public
  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));
  const isHomePage = pathname === '/';

  // 2. Public Access Check
  if (isPublicRoute || isHomePage) {
    return NextResponse.next();
  }

  // 3. Get Token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // 4. Unauthorized Check (Not Logged In)
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Verification Check (Logged in, but not verified)
  // Ensure your token actually has 'isVerified'. If your logic relies on DB, this might need adjustment,
  // but assuming your NextAuth session strategy puts this in the token:
  if (!token.isVerified) {
    return NextResponse.redirect(new URL('/verify-email', request.url));
  }


  // 6. Check if the user is trying to visit the Lead Dashboard
  if (pathname.startsWith('/lead-dashboard')) {
    
    // If their role is NOT 'LEAD', kick them to the Lead Access page
    if (token.role !== 'LEAD') {
      return NextResponse.redirect(new URL('/lead-access', request.url));
    }
  }

  // 7. Allow access if all checks pass
  return NextResponse.next();
}

// Keep your existing matcher config
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|node_modules|.*\\..*).*)',
  ],
};