import { useAuth } from "@/lib/hook/useAuth";
import { Avatar, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import EmojiPicker from "emoji-picker-react";

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
      <div className="input-comment relative flex-1 flex items-center bg-[#f4f4f4] rounded-lg">
        <TextArea
          placeholder="Nhập comment"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          onPressEnter={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleInsertComment();
            }
          }}
          autoSize={{ minRows: 1, maxRows: 4 }}
          style={{ resize: "none" }}
          classNames={{
            textarea:
              "!bg-[#f4f4f4] !outline-none !shadow-none !border-none focus:!outline-none focus:!shadow-none !pl-[10px] !leading-[35px] h-[42px]",
          }}
        />
        <Popover
          content={
            <EmojiPicker
              onEmojiClick={(emojiObject) => {
                setInputComment(inputComment + emojiObject.emoji);
              }}
            />
          }
          trigger="click"
          placement="topRight"
        >
          <span className="chat-btn-icon pr-2.5 fpme-emoji cursor-pointer shrink-0 text-[20px] text-[#8d8989] hover:text-[25px] transition-all duration-200" />
        </Popover>
      </div>

      {/* <Input
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
      /> */}
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
