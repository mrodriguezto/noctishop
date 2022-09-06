import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req });

  // API VALIDATIONS ------------------------------

  const path = req.nextUrl.pathname;

  if (path.startsWith('/api')) {
    if (!session) {
      return redirectToUnathorized(req);
    }

    const validApiRoles = ['admin'];

    // Admin
    if (path.startsWith('/api/admin')) {
      if (!validApiRoles.includes(session.user.role)) {
        return redirectToUnathorized(req);
      }
    }
  }

  // PAGES VALIDATIONS ---------------------------

  if (!session) {
    return redirectToLogin(req);
  }

  // Checkout
  if (path.startsWith('/checkout')) {
    return NextResponse.next();
  }

  // Admin
  if (path.startsWith('/admin')) {
    const validPagesRoles = ['admin'];

    if (!validPagesRoles.includes(session.user.role)) {
      return redirectToHome(req);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// API REDIRECTS

function redirectToUnathorized(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/api/auth/unauthorized';
  return NextResponse.redirect(url);
}

// PAGES REDIRECTS

function redirectToLogin(req: NextRequest) {
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  url.pathname = `/auth/login`;
  url.search = `p=${requestedPage}`;
  return NextResponse.redirect(url);
}

function redirectToHome(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
