// src/lib/profile_api.ts
import { API_CONFIG } from "@/lib/config_api";
import { UserType } from "@/model/user_type";
import { cache } from "react";

export const fetchProfile = cache(async (FO100: number, myFO100: number): Promise<UserType | null> => {
  try {
    const res = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GETPROFILE}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FO100, myFO100 }),
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    console.log(data.elements);
    return data.elements ?? null;
  } catch (error) {
    console.log("fetchProfile exception:", error);
    return null;
  }
});

// export const fetchProfile = unstable_cache(

//   async (FO100: number, myFO100: number): Promise<UserType | null> => {
//     console.log("🔥 fetchProfile CALLED:", { FO100, myFO100 });

//     try {
//       const res = await fetch(
//         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GETPROFILE}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ FO100, myFO100 }),
//           // Không dùng "no-store" để cache hoạt động
//         },
//       );

//       if (!res.ok) {
//         console.log("fetchProfile error:", res.status, res.statusText);
//         return null;
//       }

//       const data = await res.json();
//       console.log("fetchProfile data.elements:", data.elements);
//       return data.elements ?? null;
//     } catch (error) {
//       console.log("fetchProfile exception:", error);
//       return null;
//     }
//   },
//   ["profile"], // key base, Next sẽ append FO100, myFO100 vào
//   // {
//   //   revalidate: 300, // cache 5 phút, bạn chỉnh theo ý được
//   // },
// );