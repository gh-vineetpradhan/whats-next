import connectDB from "@/db/conn";
import User from "@/db/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const errors = { username: "", password: "" };
        if (!credentials) {
          return null;
        }
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          errors.username = "Username is not registered";
          throw Error(JSON.stringify(errors));
        }
        const checkPass = await compare(credentials.password, user.password);
        if (!checkPass) {
          errors.password = "Incorrect Password";
          throw Error(JSON.stringify(errors));
        }
        return user;
      },
    }),
  ],
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = { id: user.id, username: user.username };
      }
      return token;
    },
  },
};

export default options;
