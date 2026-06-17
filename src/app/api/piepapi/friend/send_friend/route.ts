import { API_CONFIG } from "@/lib/config_api";
import { callApi } from '@/lib/services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = request.headers.get("authorization") || "";

        const { data } = await callApi({
            endpoint: API_CONFIG.ENDPOINTS.SENDRQFRIEND,
            method: "POST",
            body,
            token,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
}