// components/FloatingActionButton.js
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHover } from "usehooks-ts";

type props = {
  active: "todo" | "chat" | true | undefined;
  onClick: Dispatch<SetStateAction<"todo" | "chat" | undefined>>;
};

const FloatingActionButton = ({ active = undefined, ...props }: props) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const [isActive, setIsActive] = useState<"todo" | "chat" | true | undefined>(
    active,
  );

  useEffect(() => {
    if (isHover && !isActive) {
      setIsActive(true);
    }
    if (!isHover && isActive === true) {
      setIsActive(undefined);
    }
  }, [isActive, isHover]);

  return (
    <div className="bg-red-200">
      <motion.div className="relative w-12 bg-blue-200" ref={hoverRef}>
        <motion.button
          className={`z-30 h-12 w-12 ${
            isActive == true ? "bg-blue-500" : "bg-gray-200"
          } flex items-center justify-center rounded-full`}
          whileHover={{ scale: 1.2 }}
          animate={
            isActive
              ? {
                  x: "0%",
                  position: "absolute",
                  y: "0%",
                }
              : { x: "0%", position: "absolute", y: "0%" }
          }
        >
          {/* Plus icon */}
          {/* Replace this with your plus icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </motion.button>
        <motion.button
          className={`z-20 h-12 w-12 ${
            isActive == "chat" ? "bg-green-500" : "bg-gray-300"
          } flex items-center justify-center rounded-full`}
          whileHover={{ scale: 1.2 }}
          animate={
            isActive
              ? {
                  x: "-120%",
                  position: "absolute",
                  y: "0%",
                }
              : { x: "-20%", position: "absolute", y: "0%" }
          }
          onClick={() => props.onClick("chat")}
        >
          {/* Chat icon */}
          {/* Replace this with your chat icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 14H9a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z"
            />
          </svg>
        </motion.button>
        <motion.button
          className={`z-10 h-12 w-12 ${
            isActive == "todo" ? "bg-yellow-500" : "bg-gray-400"
          } flex items-center justify-center rounded-full`}
          whileHover={{ scale: 1.2 }}
          animate={
            isActive
              ? {
                  x: "-240%",
                  position: "absolute",
                  y: "0%",
                }
              : { x: "-40%", position: "absolute", y: "0%" }
          }
          onClick={() => props.onClick("todo")}
        >
          {/* Todo icon */}
          {/* Replace this with your todo icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19l-7-7 7-7m5 14l7-7-7-7"
            />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;
