import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ['/login', '/register', '/api/auth', '/favicon.ico', '/_next'];

  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));
  const isHomePage = pathname === '/';

  if (isPublicRoute || isHomePage) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /* Your matcher looks mostly fine, but ensure 'signup' matches your 
      actual route (you used '/register' in the array above).
    */
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|node_modules).*)',
  ],
}