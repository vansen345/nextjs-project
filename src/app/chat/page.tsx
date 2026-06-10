import ChatScreen from "@/lib/ui/chat/chat_screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PiepMe: Tin nhắn",
};
export default function Page() {
  return <ChatScreen />;
}