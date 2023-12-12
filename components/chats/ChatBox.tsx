import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";

type props = {
  onClose: () => void;
};

const ChatBox = (props: props) => {
  const [roomId, setRoomID] = useState<any>();
  const [userName, setUserName] = useState<any>();

  return (
    <div className="h-[737px] w-[734px] rounded bg-white">
      {!roomId && <ChatList setRoomId={setRoomID} />}
      {roomId && (
        <ChatRoom
          roomId={roomId}
          backAction={() => setRoomID(undefined)}
          onClose={props.onClose}
        />
      )}
    </div>
  );
};

export default ChatBox;
