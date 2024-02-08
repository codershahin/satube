import { UserRole } from "@prisma/client";
import type { User } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    bio?: string | null;
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
      bio?: string | null;
      role: UserRole;
    };
  }
}
