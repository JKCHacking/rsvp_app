// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');


    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Example: Add custom headers or modify the request
    const response = NextResponse.next();
    // response.headers.set('X-Custom-Header', 'MyValue');
    return response;
}

export const config = {
    matcher: ['/dashboard/:path*'], // Routes to apply middleware
};
