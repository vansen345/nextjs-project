import { API_CONFIG } from "./config_api";

type ApiOptions<TQuery = Record<string, unknown>, TBody = unknown> = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: TQuery;
  body?: TBody;
  token?: string;
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
}: ApiOptions<TQuery, TBody>): Promise<TResponse> => {
  const queryString = query
    ? new URLSearchParams(query as Record<string, string>).toString()
    : "";

  const url = `${API_CONFIG.BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

  console.log(
    `${colors.cyan}${new Date().toLocaleTimeString()}${colors.reset} ${colors.green}${method}${colors.yellow} ${colors.red}${url}${colors.reset}`,
    JSON.stringify(query ?? body ?? {})
  );

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: method !== "GET" ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });

  return response.json();
};