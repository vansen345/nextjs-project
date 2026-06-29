import { useAuth } from "@/lib/hook/useAuth";
import { useSocket } from "@/lib/hook/useSocket";
import NProgress from "@/lib/nprogress";
import { getDecryptedTitle, HomeItem } from "@/model/home_type";
import { ContentImg } from "@/model/upload_media";
import { UserType } from "@/model/user_type";
import { RootState } from "@/store";
import imageCompression from "browser-image-compression";
import { useSession } from "next-auth/react";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import { useUploadImgVideoMutation } from "../create_piep/create_piep_services";
import { setIsModalOpen, setSelectedItem } from "../detail/detail_redux_slice";
import { setIsModalEditProfile } from "./profile_redux";
import { useAcceptFriendMutation, useCancelRequestMutation, useEditProfileMutation, useLazyGetListPostByUserQuery, useRejectFriendMutation, useSendRequestMutation, useUnfriendMutation } from "./profile_services";

export const useProfileController = (FO100: number, initialProfile: UserType | null, onUpdateProfile?: (newProfile: UserType) => void) => {
    const { likePost } = useSocket();
    const { isLoggedIn, FO100: myPost } = useAuth();
    const [profile, setProfile] = useState<UserType | null>(initialProfile);
    const [listPost, setListPost] = useState<HomeItem[]>([]);
    // bỏ triggerProfile vì server đã fetch rồi
    const [triggerListPost] = useLazyGetListPostByUserQuery();
    const isLoadingRef = useRef(false);
    const offsetRef = useRef(0);
    const hasMoreRef = useRef(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const LIMIT = 10;
    const [callApiAccept] = useAcceptFriendMutation();
    const [callApiSend] = useSendRequestMutation();
    const [friendStatus, setFriendStatus] = useState<"none" | "pending" | "accepted">(
        (initialProfile?.FRIEND_STATUS as "none" | "pending" | "accepted") ?? "none"
    );
    const [callApiCancelRequest] = useCancelRequestMutation();
    const [callApiRejectFriend] = useRejectFriendMutation();
    const [callApiUntFriend] = useUnfriendMutation();
    const [callApiEditProfile] = useEditProfileMutation();
    const isModalOpenEdit = useSelector(
        (state: RootState) => state.profile.isModalEditProfile,
    );

    const [valueName, setValueName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    // const [avatarUrl, setAvatarUrl] = useState(profile?.NV126 ?? '');
    const [uploadMedia] = useUploadImgVideoMutation();
    const { update } = useSession();
    const [avatarUrl2, setAvatarUrl2] = useState<ContentImg | null>(null);


    const fetchListPiepByUser = useCallback(async (newOffSet: number, isInitial = false) => {
        if (isLoadingRef.current || (!isInitial && !hasMoreRef.current)) return;
        isLoadingRef.current = true;
        NProgress.start();

        try {
            const { data } = await triggerListPost({ limit: LIMIT, offset: newOffSet, FO100: FO100 || 0 });
            if (data) {
                const newItems = data.elements ?? [];
                const newHasMore = newItems.length === LIMIT;

                setListPost(prev => isInitial ? newItems : [...prev, ...newItems]);
                offsetRef.current = newOffSet + LIMIT;
                hasMoreRef.current = newHasMore;
            }
            isLoadingRef.current = false;
            NProgress.done();

        } catch (error) {
            console.log(error);
        }
    }, [triggerListPost, FO100])


    useEffect(() => {
        if (!FO100) return;
        startTransition(() => {
            offsetRef.current = 0;
            hasMoreRef.current = true;
            setListPost([]);
            fetchListPiepByUser(0, true);
        })
    }, [FO100]);

    const handleItemClick = (item: HomeItem) => {
        dispatch(setSelectedItem(item));
        dispatch(setIsModalOpen(true));
        const slug = `${slugify(getDecryptedTitle(item?.PV301), { lower: true, locale: "vi" })}-${item.PV325}.html`;
        window.history.pushState(null, "", `/${slug}`);
    };

    const handleLike = (PP300: number, isLiked: boolean) => {
        likePost(PP300, FO100 || 0, isLiked);
        setListPost((prevList) =>
            prevList.map((item) => {
                if (item.PP300 === PP300) {
                    return {
                        ...item,
                        ISLIKED: isLiked ? 0 : 1,
                        TOTALLIKES: (item.TOTALLIKES || 0) + (isLiked ? -1 : 1),
                    };
                }
                return item;
            })
        );
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                if (hasMoreRef.current && !isLoadingRef.current) {
                    fetchListPiepByUser(offsetRef.current);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // useEffect(() => {
    //     const cleanup = listenOnRequestFriend((data) => {
    //         if (data.FO100S === FO100) {
    //             setStatusFriend("pending");
    //         }
    //     });
    //     return () => { cleanup?.(); };
    // }, [FO100]);

    // useEffect(() => {
    //     const cleanup = listenOnAcceptFriend((data) => {
    //         if (data.FO100R === FO100) {
    //             setStatusFriend("accepted");
    //         }
    //     });
    //     return () => { cleanup?.(); };
    // }, [FO100]);

    const handleSendRequest = async () => {
        try {
            const rs = await callApiSend({ FO100S: myPost || 0, FO100R: FO100 }).unwrap()
            if (rs.elements > 0) {
                setFriendStatus("pending");
                setProfile(prev => prev ? { ...prev, FO100S: myPost } : prev);
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleAcceptRequest = async () => {
        try {
            const rs = await callApiAccept({ FO100S: FO100, FO100R: myPost || 0 }).unwrap();
            if (rs.elements > 0) {
                setFriendStatus("accepted");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelRequest = async () => {
        try {
            const rs = await callApiCancelRequest({ FO100S: myPost || 0, FO100R: FO100 }).unwrap();
            if (rs.elements > 0) {
                setFriendStatus("none");
                setProfile(prev => prev ? { ...prev, FO100S: null } : prev);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectRequest = async () => {
        try {
            const rs = await callApiRejectFriend({ FO100S: FO100, FO100R: myPost || 0 }).unwrap();
            if (rs.elements > 0) {
                setFriendStatus("none");
                setProfile(prev => prev ? { ...prev, FO100S: null } : prev);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnfriend = async () => {
        try {
            const rs = await callApiUntFriend({ FO100S: myPost || 0, FO100R: FO100 }).unwrap();
            if (rs.elements > 0) {
                setFriendStatus("none");
                setProfile(prev => prev ? { ...prev, FO100S: null } : prev);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onOpenEdit = () => dispatch(setIsModalEditProfile(true));
    const onChangeName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setValueName(value);
    };

    const handleOpenMedia = () => {
        setTimeout(() => {
            inputRef.current?.click();
        }, 200);
    };

    const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        const compress = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 150,
        });

        formData.append('media', compress, compress.name);
        formData.append('folder', 'avatars');

        setAvatarUrl2({
            FM600: 0,
            index: 1,
            IMG: URL.createObjectURL(file),
            RATIO: 1,
            THUMB: URL.createObjectURL(file),
            DES: "",
            loading: true,
            progress: 0,
        });

        const progressInterval = setInterval(() => {
            setAvatarUrl2(prev => prev ? { ...prev, progress: (prev.progress || 0) < 90 ? (prev.progress || 0) + 10 : prev.progress } : prev);
        }, 200);

        try {
            const rs = await uploadMedia(formData).unwrap();
            clearInterval(progressInterval);
            setAvatarUrl2({ ...rs.elements[0], loading: false, progress: 100 });
        } catch (error) {
            clearInterval(progressInterval);
            console.log(error);
        }
    };

    const onEditProfile = async () => {
        const rs = await callApiEditProfile({
            FO100: FO100,
            NV106: valueName || profile?.NV106 || '',
            NV126: avatarUrl2?.IMG || profile?.NV126 || '',
        }).unwrap();

        if (rs.elements != null) {
            await update({
                NV106: valueName || profile?.NV106 || '',
                NV126: avatarUrl2?.IMG || profile?.NV126 || '',
            });
            onUpdateProfile?.(rs.elements);
            dispatch(setIsModalEditProfile(false))
        }
    }

    const onCloseEdit = async () => {
        dispatch(setIsModalEditProfile(false));
    }



    return { profile, listPost, myPost, dispatch, isLoggedIn, bottomRef, handleItemClick, handleLike, handleSendRequest, handleAcceptRequest, friendStatus, handleCancelRequest, handleRejectRequest, handleUnfriend, isModalOpenEdit, onOpenEdit, onChangeName, onEditProfile, setProfile, handleChangeAvatar, handleOpenMedia, inputRef, onCloseEdit, avatarUrl2 };
}