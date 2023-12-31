import React, { Dispatch, SetStateAction } from "react";

type props = {
  data: any[];
  onClick: Dispatch<SetStateAction<string>>;
};

const ItemList = ({ data, ...props }: props) => {
  return (
    <div className="h-full w-full divide-y overflow-auto px-8">
      {data.map((el, index) => {
        return (
          <div
            key={index}
            onClick={() => props.onClick(el.room_id)}
            className="relative flex w-full cursor-pointer items-center gap-4 py-4"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2F80ED] text-lg font-semibold uppercase text-white">
                {el.room_name.slice(0, 1)}
              </div>
            </div>
            <div className="flex w-[calc(100%-5rem)] flex-col">
              <div className="flex w-full gap-[17px]">
                <div className="w-max max-w-full break-words font-semibold text-[#2F80ED]">
                  {el.room_name}
                </div>
                <div className="w-max whitespace-nowrap">02/06/2021 10:45</div>
              </div>
              <div>{el.sender}</div>
              <div>{el.chat}</div>
            </div>
            {!el.is_read && (
              <div className="absolute right-0 top-1/2 h-2 w-2 rounded-full bg-red-400"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
