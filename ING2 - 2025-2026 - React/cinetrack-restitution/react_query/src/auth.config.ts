import type { NextAuthConfig } from "next-auth";

// Edge-compatible auth config — no Node.js modules, no database
export const authConfig: NextAuthConfig = {
  providers: [], // providers are only needed server-side
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");
      if (isAuthPage) return true;
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
};
