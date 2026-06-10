
"use client"

import { useNewMessageNotification } from "@/lib/hook/useNewMessageNotification";

export function NotificationProvider() {
    useNewMessageNotification();
    return null;
}