import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { db } from "@/lib/db";

declare module "next-auth" {
  interface User {
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("User doesn't exit!");
        }

        const isCorrectPassword = await compare(
          password,
          user.hashedPassword as string
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid password!");
        }

        return user;
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt callback", { token, user, session });
      return token;
    },

    async session({ session, token, user }) {
      // console.log("session callback", { session, token, user });
      if (token.sub && session && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
