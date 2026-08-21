import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createToken } from "./util";

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

                const parts = credentials.email.split('@');
                const normalizedEmail = parts.length === 2
                    ? `${parts[0]?.split('+')[0]}@${parts[1]}`
                    : credentials.email;
                const payload = createToken({
                    email: normalizedEmail,
                    otp: credentials.otp,
                });

                console.log("🟡 Payload gửi đi:", JSON.stringify(payload));
                const res = await fetch(`${process.env.API_BASE_URL}/email/verifyOtp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        payload
                    ),
                });
                console.log("🔵 Status code:", res.status);

                const data = await res.json();

                console.log("🔵 Response data:", JSON.stringify(data));

                if (data.status === "true" && data.elements) {
                    const profileRes = await fetch(`${process.env.API_BASE_URL}/login/getInfoUserLogin`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: credentials.email }),
                        cache: 'no-store',
                    });
                    const profile = await profileRes.json();
                    console.log('profile.elements', profile.elements);

                    return {
                        id: profile.elements?.id || credentials.email,
                        email: credentials.email,
                        NV126: profile.elements?.NV126 || "",
                        NV106: profile.elements?.NV106 || "",
                        FO100: profile.elements?.FO100 || 0,
                        accessToken:
                            data.elements.accessToken || "",
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.NV126 = user.NV126;
                token.NV106 = user.NV106;
                token.id = user.id;
                token.FO100 = user.FO100;
                token.accessToken = user.accessToken;
            }

            if (trigger === "update" && session) {
                token.NV106 = session.NV106;
                token.NV126 = session.NV126;
            }

            return token;
        },
        async session({ session, token }) {
            session.user.NV126 = token.NV126 as string;
            session.user.NV106 = token.NV106 as string;
            session.user.id = token.id as string;
            session.user.FO100 = token.FO100 as number;
            session.accessToken =
                token.accessToken as string;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};