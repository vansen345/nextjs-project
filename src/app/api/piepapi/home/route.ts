import { API_CONFIG } from "@/lib/config_api";
import { callApi } from "@/lib/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "15";
  const offset = searchParams.get("offset") || "0";
  const FO100 = searchParams.get("FO100") || "0";
  const token = request.headers.get("authorization") || "";

  console.log(`[PROXY] Calling: ${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HOME}?limit=${limit}&offset=${offset}`);

  const { data } = await callApi({
    endpoint: API_CONFIG.ENDPOINTS.HOME,
    query: { limit, offset, FO100 },
    token,
  });

  return NextResponse.json(data);
}