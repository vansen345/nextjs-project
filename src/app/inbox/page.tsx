import InboxScreen from "@/lib/ui/inbox/inbox_screen";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ conversationId?: string }>;
};

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const { conversationId } = await searchParams;

  if (!conversationId) {
    return {
      title: "PiepMe: Tin nhắn",
    };
  }

  // query DB lấy tên user theo conversationId
  const userName = "Tin nhắn";

  return {
    title: `PiepMe: ${userName}`,
  };
}

export default async function Page({ searchParams }: Props) {
  const { conversationId } = await searchParams;

  return (
    <InboxScreen
      conversationId={conversationId ? Number(conversationId) : 0}
    />
  );
}