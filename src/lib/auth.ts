import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * NextAuth options for the portfolio admin.
 *
 * Admin credentials come from env vars:
 *  - ADMIN_EMAIL (required)
 *  - ADMIN_PASSWORD_HASH (bcrypt hash, preferred)
 *  - ADMIN_PASSWORD (plain-text dev-only fallback — a warning is logged when used)
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        const plain = process.env.ADMIN_PASSWORD;

        if (!adminEmail) {
          console.warn("[auth] ADMIN_EMAIL not set — admin login disabled.");
          return null;
        }

        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";
        if (!email || !password) return null;
        if (email !== adminEmail.trim().toLowerCase()) return null;

        // Prefer the bcrypt hash.
        if (hash) {
          const ok = bcrypt.compareSync(password, hash);
          if (!ok) return null;
        } else if (plain) {
          // Dev-only fallback.
          console.warn(
            "[auth] WARNING: using plain-text ADMIN_PASSWORD fallback. Set ADMIN_PASSWORD_HASH for production."
          );
          if (password !== plain) return null;
        } else {
          console.warn("[auth] No ADMIN_PASSWORD_HASH or ADMIN_PASSWORD set — admin login disabled.");
          return null;
        }

        return { id: "admin", email, name: "Obasiochie Vincent" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        (session.user as { id?: string }).id = token.id as string | undefined;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

/** Re-usable type for the merged session object in server components. */
export type AdminSession = Awaited<
  ReturnType<typeof import("next-auth").getServerSession<typeof authOptions>>
>;
