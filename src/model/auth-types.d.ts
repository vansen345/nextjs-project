import "next-auth";

declare module "next-auth" {
    interface User {
        avatar?: string;
    }
    interface Session {
        user: {
            email: string;
            avatar?: string;
        }
    }
}