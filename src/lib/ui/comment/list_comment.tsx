import { getTimeText } from "@/lib/util";
import { IComment } from "@/model/comment_type";
import { Avatar } from "antd";

export const ListComment = ({ listComment }: { listComment: IComment[] }) => {
  return (
    <>
      {listComment.map((comment, index) => (
        <div key={index} className="content-comment mb-3">
          <div className="inline-flex bg-white rounded-lg mb-1 pt-2.5 pr-5 pb-2.5 pl-2.5">
            <div className="mr-2 w-9.75 h-9.75 rounded-4xl bg-white p-0.5 shadow-[0_4px_10px_0_rgba(0,0,0,0.15)]">
              <Avatar shape="circle" src={comment.NV126} size={35} />
            </div>
            <div>
              <p className="text-[14px] font-bold pb-1.5">
                {comment.NV106 || ""}
              </p>
              <p className="text-[14px] whitespace-normal">
                {comment.comment || ""}
              </p>
            </div>
          </div>
          <div className="action-comment flex items-center gap-8 mt-2">
            <div className="like-comment flex items-center font-bold">
              <span className="text-[17px]">
                <i className="fpme-heart-line" />
              </span>
              <span className="text-[12px] ml-1">3</span>
            </div>
            <div className="reply-comment">
              <p className="font-bold">Phản hồi</p>
            </div>
            <div className="text-[12px] font-medium">
              {getTimeText(comment.createdAt || new Date())}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListComment;
