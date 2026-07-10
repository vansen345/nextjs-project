import { fetchProfile } from "@/features/profile/get_profile";
import { authOptions } from "@/lib/auth";
import ProfileScreen from "@/lib/ui/profile/profile_screen";
import { Metadata } from "next";
import { getServerSession } from "next-auth";


// export const fetchProfile = unstable_cache( 
//   async (FO100: number, myFO100: number): Promise<UserType | null> => {
//     try {
//       console.log('fetchProfile');
      
//       const res = await fetch(
//         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GETPROFILE}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ FO100, myFO100 }),
//           // ✅ Bỏ cache: "no-store"
//         },
//       );
//       if (!res.ok) {
//         console.log("fetchProfile error:", res.status, res.statusText);
//         return null;
//       }
//       const data = await res.json();
//       console.log(data.elements);
//       return data.elements ?? null;
//     } catch (error) {
//       console.log("fetchProfile exception:", error);
//       return null;
//     }
//   },
//   ['profile'],
//   { revalidate: 3600 }
// );


export async function generateMetadata({
  params,
}: {
  params: Promise<{ FO100: string }>;
}): Promise<Metadata> {
  const { FO100 } = await params;
  const session = await getServerSession(authOptions);
  const myFO100 = session?.user?.FO100 ?? 0;

  const profile = await fetchProfile(Number(FO100), myFO100);

  return {
    // title: `PiepMe: ${profile?.NV106 ?? "Profile"}`,
    title: `SenApp: ${profile?.NV106 ?? "Profile"}`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ FO100: string }>;
}) {
  const { FO100 } = await params;
  const session = await getServerSession(authOptions);
  const myFO100 = session?.user?.FO100 ?? 0;

  const profile = await fetchProfile(Number(FO100), myFO100);

  return <ProfileScreen FO100={Number(FO100)} initialProfile={profile} />;
}