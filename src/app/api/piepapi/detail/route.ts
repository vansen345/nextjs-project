import { API_CONFIG } from "@/lib/config_api";
import { callApi } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const text = await request.text();
    if (!text) {
        return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }
    const body = JSON.parse(text);
    const { PV325, PP300, FT300, FO100 } = body;
    const token = request.headers.get("authorization") || "";

    const { data } = await callApi({
        endpoint: API_CONFIG.ENDPOINTS.DETAIL,
        method: "POST",
        body: { PV325, PP300, FT300, FO100 },
        token,
    });

    return NextResponse.json(data);

}