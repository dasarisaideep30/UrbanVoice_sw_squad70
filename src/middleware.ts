import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Custom logic can go here if needed
        // e.g. Redirect non-admin users from /admin
        const token = req.nextauth.token;
        const isOfficial = token?.role === "OFFICIAL" || token?.role === "ADMIN";
        const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

        if (isAdminPath && !isOfficial) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/complaints/:path*", "/api/complaints/:path*"],
};
