import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "OTP",
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.otp) return null;

                const res = await fetch(`${process.env.API_BASE_URL}/email/verifyOtp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        otp: credentials.otp,
                    }),
                });

                const data = await res.json();

                if (data.status === "true" && data.elements === 1) {
                    const profileRes = await fetch(`${process.env.API_BASE_URL}/login/getInfoUserLogin`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: credentials.email }),
                    });
                    const profile = await profileRes.json();

                    return {
                        id: credentials.email,
                        email: credentials.email,
                        avatar: profile.elements?.avatar || "",
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.avatar = token.avatar as string;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};