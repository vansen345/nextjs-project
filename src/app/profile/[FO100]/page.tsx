import { API_CONFIG } from "@/lib/config_api";
import ProfileScreen from "@/lib/ui/profile/profile_screen";
import { UserType } from "@/model/user_type";
import { Metadata } from "next";

async function fetchProfile(FO100: number): Promise<UserType | null> {
  try {
        const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GETPROFILE}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ FO100 }),
        });
        if (!res.ok) {
            console.log("fetchProfile error:", res.status, res.statusText);
            return null;
        }
        const data = await res.json();
        console.log("fetchProfile data:", data);
        return data.elements ?? null;
    } catch (error) {
        console.log("fetchProfile exception:", error);
        return null;
    }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ FO100: string }>;
}): Promise<Metadata> {
  const { FO100 } = await params;
  const profile = await fetchProfile(Number(FO100));
  return {
    title: `PiepMe: ${profile?.NV106 ?? "Profile"}`,
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ FO100: string }> }) {
    const { FO100 } = await params;
    const profile = await fetchProfile(Number(FO100));
    return <ProfileScreen FO100={Number(FO100)} initialProfile={profile} />;
}
