import { API_CONFIG } from "@/lib/config_api";
import { callApi } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const text = await request.text();
    if (!text) {
        return NextResponse.json({ error: "Empty" }, { status: 400 })
    }
    const body = JSON.parse(text);
    const { email, otp } = body;
    const cookie = request.headers.get("cookie") || "";

    const { data, setCookie } = await callApi({
        endpoint: API_CONFIG.ENDPOINTS.VERIFYTOTP,
        method: "POST",
        body: { email, otp },
        token: "",
        cookie,
    })
    const response = NextResponse.json(data);
    if (setCookie) {
        response.headers.set('set-cookie', setCookie);
    }
    return response;
}