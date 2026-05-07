import { API_CONFIG } from "@/lib/config_api";
import { callApi } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//     const text = await request.text();
//     if (!text) {
//         return NextResponse.json({ error: "Empty" }, { status: 400 })
//     }
//     const body = JSON.parse(text);
//     const { email } = body;
//     const token = request.headers.get("authorization") || "";

//     const data = await callApi({
//         endpoint: API_CONFIG.ENDPOINTS.GETINFOLOGIN,
//         method: "POST",
//         body: { email },
//         token: token,
//     })
//     return NextResponse.json(data);
// } 



export async function POST(request: NextRequest) {
    const cookie = request.headers.get("cookie") || "";
console.log("cookie:", cookie); // ← thêm log này
    const { data, setCookie } = await callApi({
        endpoint: API_CONFIG.ENDPOINTS.GETINFOLOGIN,
        method: "POST",
        token: "",
        cookie,
    });

    const response = NextResponse.json(data);

    if (setCookie) {
        response.headers.set('set-cookie', setCookie);
    }

    return response;
}