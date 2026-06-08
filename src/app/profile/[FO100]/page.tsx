import ProfileScreen from "@/lib/ui/profile/profile_screen";

export default async function ProfilePage({ params }: { params: Promise<{ FO100: string }> }) {
    const { FO100 } = await params;
    return <ProfileScreen FO100={Number(FO100)} />;
}