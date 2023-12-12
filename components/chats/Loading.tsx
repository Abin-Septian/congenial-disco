import Image from "next/image";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src={"/icons/loading.svg"}
        alt=""
        width={80}
        height={80}
        className="animate-spin"
      />
      <div className="font-semibold text-[#4F4F4F]">Loading Chat ...</div>
    </div>
  );
};

export default LoadingSpinner;
