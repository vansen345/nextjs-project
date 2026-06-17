"use client";

import { IMessage } from "@/model/message_type";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { disconnectSocket, getSocket } from "../socket";


export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    const [isConnected, setIsConnected] = useState(() => {
        const s = getSocket();
        return s.connected;
    });

    useEffect(() => {
        const s = getSocket();
        socketRef.current = s;
        if (!s.connected) {
            s.connect();
        }

        const handleConnect = () => {
            // console.log("✅ Socket connected:", s.id);
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            // console.log("❌ Socket disconnected");
            setIsConnected(false);
        };

        s.on("connect", handleConnect);
        s.on("disconnect", handleDisconnect);

        return () => {
            s.off("connect", handleConnect);
            s.off("disconnect", handleDisconnect);
        };
    }, []);

    const joinRoom = (roomId: string) => {
        socketRef.current?.emit("joinRoom", roomId);
    };

    const onReceiveMessage = (
        callback: (data: IMessage) => void
    ) => {

        socketRef.current?.on("receiveMessage", callback);

        return () => {
            socketRef.current?.off("receiveMessage", callback);
        };
    };

    const likePost = (PP300: number, FO100: number, isLiked: boolean) => {
        socketRef.current?.emit('likePost', { PP300, FO100, isLiked });
    };

    const onLikePost = (callback: (data: { PP300: number }) => void) => {
        socketRef.current?.on('likePost', callback);
        return () => socketRef.current?.off('likePost', callback);
    };

    const listenOnRequestFriend = (callback: (data: { FO100S: number, NV106: string, NV126: string }) => void) => {
        socketRef.current?.on('friendRequest', callback);
        return () => socketRef.current?.off('friendRequest', callback);
    }
    const listenOnAcceptFriend = (callback: (data: { FO100R: number, NV106: string, NV126: string }) => void) => {
        socketRef.current?.on('friendRequestAccepted', callback);
        return () => socketRef.current?.off('friendRequestAccepted', callback);
    }
    return {
        isConnected,
        likePost,
        onLikePost,
        disconnectSocket,
        joinRoom,
        onReceiveMessage,
        listenOnRequestFriend,
        listenOnAcceptFriend
    };
};

