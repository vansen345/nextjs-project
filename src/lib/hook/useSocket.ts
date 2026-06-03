"use client";

import { IMessage } from "@/model/message_type";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { disconnectSocket, getSocket } from "../socket";

// // export const useSocket = () => {

// //     // const [socket, setSocket] = useState<Socket | null>(null);
// //     // const [isConnected, setIsConnected] = useState(false);
// //     const socketRef = useRef<Socket | null>(null);
// //     // const isConnectedRef = useRef(false);
// //     const [isConnected, setIsConnected] = useState(() => {
// //         const s = getSocket();
// //         return s.connected;
// //     });

// //     useEffect(() => {
// //         const s = getSocket();
// //         socketRef.current = s;


// //         // ← Kiểm tra nếu đã connected rồi
// //         // if (s.connected) {
// //         //     setIsConnected(true);
// //         // }

// //         s.on("connect", () => {
// //             console.log("✅ Socket connected:", s.id);
// //             setIsConnected(true);
// //         });

// //         s.on("disconnect", () => {
// //             console.log("❌ Socket disconnected");
// //             setIsConnected(false);
// //         });

// //         return () => {
// //             s.off("connect");
// //             s.off("disconnect");
// //         };
// //     }, []);

// //     const sendMessage = (
// //         roomId: string,
// //         message: string,
// //         senderEmail: string,
// //         senderId: string,
// //         senderAvatar: string,
// //     ) => {
// //         if (socketRef.current) {
// //             socketRef.current.emit("sendMessage", {
// //                 roomId,
// //                 message,
// //                 senderId,
// //                 senderEmail,
// //                 senderAvatar,
// //             });
// //         }
// //     };

// //     const joinRoom = (roomId: string) => {
// //         if (socketRef.current) {
// //             socketRef.current.emit("joinRoom", roomId);
// //         }
// //     };
// //     const onReceiveMessage = (callback: (data: IMessage) => void) => {
// //         if (!socketRef.current) return; socketRef.current.on("receiveMessage", callback); return () => { socketRef.current?.off("receiveMessage", callback); };
// //     };

// //     return { isConnected, disconnectSocket, sendMessage, joinRoom, onReceiveMessage };
// // };

// export const useSocket = () => {
//     const socketRef = useRef<Socket | null>(null);

//     const [isConnected, setIsConnected] = useState(() => {
//         const s = getSocket();
//         return s.connected;
//     });

//     useEffect(() => {
//         const s = getSocket();

//         socketRef.current = s;

//         const handleConnect = () => {
//             console.log("✅ Socket connected:", s.id);
//             setIsConnected(true);
//         };

//         const handleDisconnect = () => {
//             console.log("❌ Socket disconnected");
//             setIsConnected(false);
//         };

//         s.on("connect", handleConnect);
//         s.on("disconnect", handleDisconnect);

//         return () => {
//             s.off("connect", handleConnect);
//             s.off("disconnect", handleDisconnect);
//         };
//     }, []);

//     const joinRoom = (roomId: string) => {
//         socketRef.current?.emit("joinRoom", roomId);
//     };

//     const onReceiveMessage = (
//         callback: (data: IMessage) => void
//     ) => {

//         socketRef.current?.on("receiveMessage", callback);

//         return () => {
//             socketRef.current?.off("receiveMessage", callback);
//         };
//     };

//     return {
//         isConnected,
//         disconnectSocket,
//         joinRoom,
//         onReceiveMessage,
//     };
// };

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
            console.log("✅ Socket connected:", s.id);
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            console.log("❌ Socket disconnected");
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

    return {
        isConnected,
        disconnectSocket,
        joinRoom,
        onReceiveMessage,
    };
};

