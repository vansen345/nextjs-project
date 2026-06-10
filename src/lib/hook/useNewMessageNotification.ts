'use client'

import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useSocket } from "./useSocket";


export const useNewMessageNotification = () => {
    const { onReceiveMessage, joinRoom } = useSocket();
    const { userId } = useAuth();

    // useEffect(() => {
    //     document.title = 'PiepME';
    // }, []);

    useEffect(() => {
        if (userId) joinRoom(userId);
    }, [userId]);

    useEffect(() => {
        const cleanup = onReceiveMessage((data) => {
            if (data.senderId !== userId) {
                document.title = 'Có tin nhắn mới';
            }
        });
        return () => cleanup?.();
    }, [onReceiveMessage]);
};