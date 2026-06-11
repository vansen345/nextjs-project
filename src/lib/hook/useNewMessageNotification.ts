'use client'

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { useSocket } from "./useSocket";



export const useNewMessageNotification = () => {
    const { onReceiveMessage, joinRoom } = useSocket();
    const { userId } = useAuth();
    const [hasNewMessage, setHasNewMessage] = useState(false);
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

    const stopBlinking = () => {
        console.log("STOP BLINKING");
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        console.log("register listener");
        const cleanup = onReceiveMessage((data) => {
            console.log(data);
            if (data.senderId === userId) return;
            if (!pathname.startsWith("/chat")) {
                setHasNewMessage(true);
                startBlinking(data.senderName || 'Tin nhắn mới');
            }
        });
        return () => {
            console.log("unregister listener");
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