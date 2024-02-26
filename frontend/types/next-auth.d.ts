import NextAuth from "next-auth";
import { User } from "@src/models/user";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      username?: string | null;
      image?: string | null;
      accessToken?: string;
      password?: string;
    };
  }

  interface JWT {
    accessToken?: string;
  }

  interface AdapterUser extends User {
    accessToken?: string;
  }
}


export interface AuthOptions {
  providers: Provider[];
  secret?: string;
  session?: Partial<SessionOptions>;
  jwt?: Partial<JWTOptions>;
  pages?: Partial<PagesOptions>;
  callbacks?: Partial<CallbacksOptions>;
  events?: Partial<EventCallbacks>;
  adapter?: Adapter;
  debug?: boolean;
  logger?: Partial<LoggerInstance>;
  theme?: Theme;
  useSecureCookies?: boolean;
  cookies?: Partial<CookiesOptions>;
}