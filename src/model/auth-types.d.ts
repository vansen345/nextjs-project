import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        NV126?: string;
        NV106?: string;
        FO100?: number;
        accessToken?: string;
    }
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            email: string;
            NV126?: string;
            NV106?: string;
            FO100?: number;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        NV126?: string;
        NV106?: string;
        id?: string;
        FO100?: number;
        accessToken?: string;
    }
}