import { API_CONFIG } from "@/lib/config_api";
import { callApi } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   console.log('function GET called with request:', request); // ← thêm log này
   
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const FO100 = searchParams.get("FO100");
    const token = request.headers.get("authorization") || "";
    const { data } = await callApi({
        endpoint: `${API_CONFIG.ENDPOINTS.GET_MESSAGES}/${conversationId}`,
        method: "GET",
        query:{limit,offset,FO100},
        token,
    });
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const text = await request.text();
    if (!text) {
        return NextResponse.json({ error: "Empty" }, { status: 400 });
    }
    const body = JSON.parse(text);
    const token = request.headers.get("authorization") || "";

    const { data } = await callApi({
        endpoint: API_CONFIG.ENDPOINTS.SAVE_MESSAGE,
        method: "POST",
        body,
        token,
    });
    return NextResponse.json(data);
}