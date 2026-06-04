import { Input } from "antd";

export const InputComment = ({ inputComment, setInputComment, handleInsertComment }: {
    inputComment: string;
    setInputComment: (value: string) => void;
    handleInsertComment: () => void;
}) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-3 flex gap-2 rounded-b-lg">
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
                className="bg-[#f3495b] text-white px-4 py-2 rounded-lg cursor-pointer"
            >
                Gửi
            </button>
        </div>
    );
};

export default InputComment;
