
import { useSession } from 'next-auth/react';

export const useAuth = () => {
    const { data: session } = useSession();
    return {
        session,
        isLoggedIn: !!session,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        NV126: session?.user?.NV126,
        NV106: session?.user?.NV106,
        FO100: session?.user?.FO100,
    };
};