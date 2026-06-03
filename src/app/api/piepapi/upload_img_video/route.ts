import { API_CONFIG } from "@/lib/config_api";
import { callApiUploadMedia } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        console.log("body222222", formData);
        const token = request.headers.get("authorization") || "";
        const { data } = await callApiUploadMedia({
            endpoint: API_CONFIG.ENDPOINTS.UPLOAD_MEDIA,
            body: formData,
            token,
        })
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
}