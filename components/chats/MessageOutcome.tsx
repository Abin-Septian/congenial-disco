import moment from "moment";
import React from "react";
import { twMerge } from "tailwind-merge";

type props = {
  data: any;
};

const MessageIncome = (props: props) => {
  return (
    <div className="flex w-full flex-col">
      <div className="w-full text-right font-semibold capitalize text-[#9B51E0]">
        {props.data?.sender}
      </div>
      <div className="flex w-full items-start justify-end gap-4">
        <div>...</div>
        <div
          className={
            "max-w-[75%] space-y-2 rounded-[5px] bg-[#EEDCFF] p-[10px] text-[#4F4F4F]"
          }
        >
          <div>{props.data?.chat}</div>
          <div className="text-sm font-semibold">
            {moment.utc(props.data?.createdAt).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageIncome;
