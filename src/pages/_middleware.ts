import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (typeof window !== 'undefined') {
    localStorage.getItem('user');
  }

  const { pathname } = req.nextUrl;
  if (pathname == '/') {
    return NextResponse.redirect('/account-settings');
  }

  return NextResponse.next();
}
