import { API_CONFIG } from '@/lib/config_api';
import { callApi } from '@/lib/services';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = request.headers.get("authorization") || "";
        const { data } = await callApi({
            endpoint: API_CONFIG.ENDPOINTS.INSERTCOMMENT,
            method: "POST",
            body, token,
        });
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }

};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const PP300 = searchParams.get("PP300")
        const limit = searchParams.get("limit") || "15";
        const offset = searchParams.get("offset") || "0";
        const token = request.headers.get("authorization") || "";

        const { data } = await callApi({
            endpoint: `${API_CONFIG.ENDPOINTS.GETLISTCOMMENT}/${PP300}`,
            method: "GET",
            query: { limit, offset },
            token
        });
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }


}