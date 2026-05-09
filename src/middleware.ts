import NextAuth from "next-auth";

const { auth: middlewareAuth } = NextAuth({
  providers: [],
});

export default middlewareAuth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = nextUrl.pathname === "/admin/login";

  if (isApiAuthRoute) {
    return;
  }

  if (isLoginRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin", nextUrl));
    }
    return;
  }

  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
