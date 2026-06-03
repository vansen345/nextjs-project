
import { API_CONFIG } from "./config_api";

type ApiOptions<TQuery = Record<string, unknown>, TBody = unknown> = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: TQuery;
  body?: TBody;
  token?: string;
  cookie?: string;
  headers?: Record<string, string>;
};

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};



export const callApi = async<
  TResponse = unknown,
  TQuery = Record<string, unknown>,
  TBody = unknown
>({
  endpoint,
  method = "GET",
  query,
  body,
  token,
  cookie,
  headers,
}: ApiOptions<TQuery, TBody>): Promise<{ data: TResponse; setCookie: string | null }> => {
  const queryString = query
    ? new URLSearchParams(query as Record<string, string>).toString()
    : "";

  const url = `${API_CONFIG.BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

  console.log(
    `${colors.cyan}${new Date().toLocaleTimeString()}${colors.reset} ${colors.green}${method}${colors.yellow} ${colors.red}${url}${colors.reset}`,

  );

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
      Cookie: cookie || "",
      ...headers,
    },
    body: method !== "GET" ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });

  const setCookie = response.headers.get("set-cookie");

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text.slice(0, 200)}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const data = await response.json();
    return { data, setCookie };
  }

  const text = await response.text();
  throw new Error(`Expected JSON but got ${contentType}: ${text.slice(0, 200)}`);
};

export const callApiUploadMedia = async<TResponse = unknown>({
    endpoint,
    body,
    token,
}: {
    endpoint: string;
    body: FormData;
    token?: string;
}): Promise<{ data: TResponse; setCookie: string | null }> => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: token || "",
            // không set Content-Type để browser tự set boundary
        },
        body,
        signal: AbortSignal.timeout(30000),
    });

    const setCookie = response.headers.get("set-cookie");

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error ${response.status}: ${text.slice(0, 200)}`);
    }

    const data = await response.json();
    return { data, setCookie };
};