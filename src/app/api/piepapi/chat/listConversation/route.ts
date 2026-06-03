import { API_CONFIG } from "@/lib/config_api";
import { callApi } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "15";
  const offset = searchParams.get("offset") || "0";
  const token = request.headers.get("authorization") || "";
  const userEmail = request.headers.get("x-user-email") || ""; 


  const {data} = await callApi({
    endpoint: API_CONFIG.ENDPOINTS.LIST_CHAT,
    query: { limit, offset },
    token,
    headers:{
      "x-user-email": userEmail
    }
  });

  return NextResponse.json(data);
}