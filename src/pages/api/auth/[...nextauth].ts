import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const userPassword = await prisma.account.findUnique({
          where: {
            email,
          },
          select: {
            password: true,
          },
        });

        if (userPassword) {
          const isEqual = bcrypt.compareSync(password, userPassword?.password);

          if (isEqual) {
            const user = await prisma.account.findUnique({
              where: {
                email,
              },
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                companyId: true,
              },
            });

            return user;
          }
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
