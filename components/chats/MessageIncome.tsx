import moment from "moment";
import React from "react";
import { twMerge } from "tailwind-merge";

type props = {
  data: any;
};

const MessageIncome = (props: props) => {
  return (
    <div className="w-full">
      <div
        className={twMerge(
          "w-full font-semibold capitalize",
          props.data?.is_read ? "text-[#E5A443]" : "text-[#43B78D]",
        )}
      >
        {props.data?.sender}
      </div>
      <div className="flex w-full max-w-[75%] items-start gap-4">
        <div
          className={twMerge(
            "rounded-[5px] p-[10px] text-[#4F4F4F] space-y-2",
            props.data?.is_read ? "bg-[#FCEED3]" : "bg-[#D2F2EA]",
          )}
        >
          <div>{props.data?.chat}</div>
          <div className="text-sm font-semibold">{moment(props.data?.createdAt).format('HH:mm')}</div>
        </div>
        <div>...</div>
      </div>
    </div>
  );
};

export default MessageIncome;
