import Image from "next/image";
import { Inter } from "next/font/google";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useRef, useState } from "react";
import ChatBox from "@/components/chats/ChatBox";
import TodoBox from "@/components/TodoBox";
import { useOnClickOutside } from "usehooks-ts";
import SearchBar from "@/components/chats/SearchBar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const ref = useRef(null);
  const [menuActive, setMenu] = useState<"todo" | "chat" | undefined>();

  useOnClickOutside(ref, () => setMenu(undefined));

  return (
    <main className="relative flex h-screen w-full bg-[#333]">
      <Sidebar />
      <div className="h-full w-full">
        <div className="group m-auto bg-[#4F4F4F] p-[10px] focus-within:border-blue-400">
          <label
            htmlFor="chat_search"
            className="flex w-full items-center px-2 py-0 leading-4"
          >
            <div className="h-5 w-5 bg-red-200"></div>
            <input
              type="text"
              name="chat_search"
              className="text-md w-full bg-transparent leading-3 text-[#333] focus:outline-none"
              placeholder="Search"
            />
          </label>
        </div>
      </div>
      <div
        ref={ref}
        className="fixed bottom-4 right-4 flex flex-col items-end justify-end gap-4 pb-12"
      >
        {menuActive === "todo" && (
          <TodoBox onClose={() => setMenu(undefined)} />
        )}
        {menuActive === "chat" && (
          <ChatBox onClose={() => setMenu(undefined)} />
        )}
        <FloatingActionButton
          active={menuActive}
          onClick={setMenu}
          key={menuActive}
        />
      </div>
    </main>
  );
}
