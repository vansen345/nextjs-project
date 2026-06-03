import "next-auth";

declare module "next-auth" {
    interface User {
        NV126?: string;
        NV106?: string;
        FO100?: number;
    }
    interface Session {
        user: {
            id: string;
            email: string;
            NV126?: string;
            NV106?: string;
            FO100?: number;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        NV126?: string;
        NV106?: string;
        id?: string;
        FO100?: number;
    }
}