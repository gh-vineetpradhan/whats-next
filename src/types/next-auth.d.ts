import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

type TUser = {
  id: string;
  username: string;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: TUser;
  }
  interface User extends TUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: TUser;
  }
}
