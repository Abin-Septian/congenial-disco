import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import IsEmpty from "./IsEmpty";
import LoadingSpinner from "./Loading";
import ItemList from "./ItemList";

type props = {
  setRoomId: Dispatch<SetStateAction<string>>;
};

const ChatList = (props: props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://657821e5f08799dc80445881.mockapi.io/api/v1/chats",
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const fetchedData = await response.json();
      const latestItemsByRoomId = fetchedData.reduce((acc: any, item: any) => {
        if (
          !acc[item.room_id] ||
          new Date(acc[item.room_id].createdAt) < new Date(item.createdAt)
        ) {
          acc[item.room_id] = item;
        }
        return acc;
      }, {});

      const filteredData = Object.values(latestItemsByRoomId);

      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <div className="flex h-full flex-col gap-4 py-6">
      <div className="w-full px-8">
        <SearchBar onChange={(val) => console.log(val)} />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : data.length ? (
        <ItemList data={data} onClick={props.setRoomId} />
      ) : (
        <IsEmpty></IsEmpty>
      )}
    </div>
  );
};

export default ChatList;
