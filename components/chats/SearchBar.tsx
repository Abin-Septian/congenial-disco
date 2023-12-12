import React from "react";

type props = {
  onChange: (val: string) => void;
};

const SearchBar = (props: props) => {
  return (
    <div className="flex justify-center w-full rounded border p-[10px] focus-within:border-blue-400">
      <label
        htmlFor="chat_search"
        className="flex w-full max-w-[600px] items-center px-2 py-0 leading-3"
      >
        <input
          type="text"
          name="chat_search"
          className="w-full text-sm leading-3 text-[#333] focus:outline-none"
          placeholder="Search"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="right-4 top-1/2 h-3 w-3 bg-red-100"></div>
      </label>
    </div>
  );
};

export default SearchBar;
