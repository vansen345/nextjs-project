import { useAuth } from "@/lib/hook/useAuth";
import { useSocket } from "@/lib/hook/useSocket";
import NProgress from "@/lib/nprogress";
import { getDecryptedTitle, HomeItem } from "@/model/home_type";
import { UserType } from "@/model/user_type";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { setIsModalOpen, setSelectedItem } from "../detail/detail_redux_slice";
import { useAcceptFriendMutation, useCancelRequestMutation, useLazyGetListPostByUserQuery, useRejectFriendMutation, useSendRequestMutation } from "./profile_services";

export const useProfileController = (FO100: number, initialProfile: UserType | null) => {
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

    const fetchListPiepByUser = useCallback(async (newOffSet: number, isInitial = false) => {
        if (isLoadingRef.current || (!isInitial && !hasMoreRef.current)) return;
        isLoadingRef.current = true;
        NProgress.start();

        try {
            const { data } = await triggerListPost({ limit: LIMIT, offset: newOffSet, FO100: FO100 || 0 });
            if (data) {
                const newItems = data.elements ?? [];
                const newHasMore = newItems.length === LIMIT;

                setListPost(prev => isInitial ? newItems : [...newItems, ...prev]);
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


    return { profile, listPost, myPost, dispatch, isLoggedIn, bottomRef, handleItemClick, handleLike, handleSendRequest, handleAcceptRequest, friendStatus, handleCancelRequest, handleRejectRequest };
}