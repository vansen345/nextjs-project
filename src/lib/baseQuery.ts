import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api/piepapi",
  prepareHeaders: (headers) => {
    const token = "your_token_here";
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});