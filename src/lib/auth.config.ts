import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  // Trust the request host on Vercel preview deployments so that auth
  // redirects resolve against the current deployment URL rather than
  // a hardcoded NEXTAUTH_URL pointing at production.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
  },
};
