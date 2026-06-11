'use client'

import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHasNewMessage } from "./notificationMessage";
import { useAuth } from "./useAuth";
import { useSocket } from "./useSocket";



export const useNewMessageNotification = () => {
    const { onReceiveMessage, joinRoom } = useSocket();
    const hasNewMessage = useSelector((state: RootState) => state.notificationMessage.hasNewMessage);

    const dispatch = useDispatch();
    const { userId } = useAuth();
    // const [hasNewMessage, setHasNewMessage] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const senderNameRef = useRef<string>('');
    const pathname = usePathname();

    useEffect(() => {
        if (userId) joinRoom(userId);
    }, [userId]);

    const startBlinking = (senderName: string) => {
        console.log("START BLINKING", senderName);
        senderNameRef.current = senderName;
        if (intervalRef.current) clearInterval(intervalRef.current);

        let toggle = false;
        intervalRef.current = setInterval(() => {
            document.title = toggle ? senderNameRef.current : 'Có tin nhắn mới';
            toggle = !toggle;
        }, 500);
    };

    const stopBlinking = useCallback(() => {
        console.log("STOP BLINKING", intervalRef.current);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (pathname.startsWith("/chat")) {
            stopBlinking();
        }
    }, [pathname]);

    useEffect(() => {
        console.log("register listener");
        const cleanup = onReceiveMessage((data) => {
            console.log(
                'RECEIVE',
                {
                    id: data._id,
                    senderId: data.senderId,
                    message: data.message,
                    pathname: pathname
                }
            );
            if (data.senderId === userId) return;
            if (!pathname.startsWith("/chat")) {
                dispatch(setHasNewMessage(true)) ;
                startBlinking(data.senderName || 'Tin nhắn mới');
            }
        });
        return () => {
            console.log("unregister listener", pathname);
            cleanup?.();
        };
    }, [onReceiveMessage, pathname]);

    return { hasNewMessage, setHasNewMessage, stopBlinking };
};

// if (data.senderId === userId) return;
//         if (pathname.startsWith("/chat")) return;

//         setHasNewMessage(true);

//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }

//         let showSender = false;

//         intervalRef.current = setInterval(() => {
//             document.title = showSender
//                 ? `💬 ${data.NV106}`
//                 : "💬 Có tin nhắn mới";

//             showSender = !showSender;
//         }, 500);