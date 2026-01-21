import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  //console.log("This is a proxy function.");
  const {pathname} = request.nextUrl
  const publicRoutes = ['/login', '/register', 'api/auth', '/favicon.ico', '_next']
  const flag = publicRoutes.some((path) => pathname.startsWith(path))
  if(flag) return NextResponse.next();
  const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
  if(!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|node_modules).*)',
  ],
}
