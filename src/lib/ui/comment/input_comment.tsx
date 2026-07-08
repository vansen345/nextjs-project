import { useAuth } from "@/lib/hook/useAuth";
import { Avatar, Input } from "antd";

export const InputComment = ({
  inputComment,
  setInputComment,
  handleInsertComment,
}: {
  inputComment: string;
  setInputComment: (value: string) => void;
  handleInsertComment: () => void;
}) => {
  const { NV126 } = useAuth();
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white p-3 flex gap-2 rounded-b-lg">
      <Avatar
        size="large"
        shape="circle"
        style={{ cursor: "pointer" }}
        src={NV126 || null}
      />
      <Input
        placeholder="Nhập comment"
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)}
        onPressEnter={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleInsertComment();
          }
        }}
        classNames={{
          root: "flex-1 !bg-[#f4f4f4] !border-none !rounded-lg",
          input: "!bg-[#f4f4f4]",
        }}
      />
      <button
        onClick={handleInsertComment}
        disabled={inputComment.trim() === ""}
        className="bg-[#f3495b] text-white! px-4 py-2 rounded-lg cursor-pointer disabled:bg-[#f4f4f4] disabled:text-[#999]! disabled:cursor-not-allowed"
      >
        Gửi
      </button>
    </div>
  );
};

export default InputComment;
