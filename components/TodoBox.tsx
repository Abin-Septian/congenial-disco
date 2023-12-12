import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type props = {
  onClose: () => void;
};

const TodoBox = (props: props) => {
  return (
    <div className="h-[737px] w-[734px] rounded bg-white p-[24px_32px]">
      <div onClick={props.onClose}>Close</div>
    </div>
  );
};

export default TodoBox;
