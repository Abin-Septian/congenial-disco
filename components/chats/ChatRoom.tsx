import React, { useEffect, useState } from "react";
import MessageOutcome from "./MessageOutcome";
import MessageIncome from "./MessageIncome";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import moment from "moment";

type props = {
  roomId: string;
  backAction: () => void;
  onClose: () => void;
};

const ChatRoom = (props: props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const user = "You";

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://657821e5f08799dc80445881.mockapi.io/api/v1/chats",
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const fetchedData = await response.json();
      setData(
        fetchedData
          .filter((el: any) => el.room_id === props.roomId)
          .sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA - dateB;
          }),
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await fetch(
        "https://657821e5f08799dc80445881.mockapi.io/api/v1/chats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createdAt: new Date().toISOString(),
            chat: newMessage,
            sender: user,
            is_read: true,
            room_id: props.roomId,
            room_name: roomName,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      // After sending the message successfully, refetch the data to update the chat room
      fetchData();
      setNewMessage('')
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <></>;

  const uniqueRoomNamesSet = new Set(data?.map((item) => item.room_name));
  const uniqueSenderSet = new Set(data?.map((item) => item.sender));
  const arrSender = Array.from(uniqueSenderSet);
  const uniqueRoomNamesArray = Array.from(uniqueRoomNamesSet);
  const roomName = uniqueRoomNamesArray[0];

  return (
    <div className="relative h-full">
      <div className="relative z-10 flex h-20 w-full items-center gap-4 border-b bg-white px-6">
        <div className="" onClick={props.backAction}>
          back
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold capitalize text-[#2F80ED]">
            {uniqueRoomNamesSet}
          </div>
          {arrSender.length > 2 && (
            <div className="text-sm font-semibold text-[#333]">
              {arrSender.length} Participants
            </div>
          )}
        </div>
        <div className="" onClick={props.onClose}>
          close
        </div>
      </div>
      <div
        className={twMerge(
          "absolute top-0 z-0 flex h-full w-full flex-col gap-6 overflow-auto px-[29px] py-24",
          loading && "pb-36",
        )}
      >
        {<Messages data={data} user={user} />}
      </div>
      <div
        className={twMerge(
          "absolute bottom-0 left-0 w-full space-y-2 bg-white p-4",
          loading && "pt-0",
        )}
      >
        {loading && (
          <div className="flex w-full items-center gap-3 rounded bg-[#E9F3FF] p-[10px]">
            <Image
              src={"/icons/loading_blue.svg"}
              alt=""
              width={38}
              height={38}
              className="animate-spin"
            />
            <div className="font-semibold text-[#4F4F4F]">
              Please wait while we connect you with one of our team ...
            </div>
          </div>
        )}
        <div className=" flex w-full gap-4">
          <input
            type="text"
            className="h-full w-full rounded-lg border p-2 px-4"
            placeholder="Type a new message"
            onChange={(e: any) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            onClick={() => sendMessage()}
            className="rounded bg-[#2F80ED] px-4 py-2 font-semibold text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

const Messages = ({ data, user }: { data: any[]; user: string }) => {
  let todayAdded = false;
  let newMessageAdded = false;
  return data.map((item, index) => {
    const isToday = moment().diff(item.createdAt, "day") === 0 ? true : false;
    const isUnread = !item.is_read;

    if (isToday && !todayAdded) {
      todayAdded = true;
      return (
        <React.Fragment key={index}>
          <div className="relative my-2 w-full border text-center">
            <div className="absolute -top-4 left-[35%] w-60 bg-white text-center">
              Today {moment(item.createdAt).format("MMM DD, YYYY")}
            </div>
          </div>
          {item.sender === user ? (
            <MessageOutcome data={item} />
          ) : (
            <MessageIncome data={item} />
          )}
        </React.Fragment>
      );
    }

    if (isUnread && !newMessageAdded) {
      newMessageAdded = true;
      return (
        <React.Fragment key={index}>
          <div className="relative my-2 w-full border text-center">
            <div className="absolute -top-4 left-[35%] w-60 bg-white text-center">
              New Message
            </div>
          </div>
          {item.sender === user ? (
            <MessageOutcome data={item} />
          ) : (
            <MessageIncome data={item} />
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={index}>
        {item.sender === user ? (
          <MessageOutcome data={item} />
        ) : (
          <MessageIncome data={item} />
        )}
      </React.Fragment>
    );
  });
};
