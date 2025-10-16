"use client";

import { useState } from "react";

interface NonFriendListProps {
  currentUserId: string | undefined;
  onAddFriend: (user: any) => void;
}

const dummyUsers = [
  {
    _id: "68f0dcf875b5c41732fa20b5f",
    name: "Mohammed Nazim",
    email: "mohammednazim3629@gmail.com",
    avatar:
      "https://res.cloudinary.com/dpelhoupo/image/upload/v1760615699/uploads/rmxhvszscpdbmsfdzrqt.jpg",
    lastActive: "2025-10-16T11:54:32.256Z",
  },
  {
    _id: "68f0dcf875b5c41732fa20b6",
    name: "John Doe",
    email: "johndoe@example.com",
    avatar:
      "https://res.cloudinary.com/dpelhoupo/image/upload/v1760615699/uploads/rmxhvszscpdbmsfdzrqt.jpg",
    lastActive: "2025-10-16T12:00:00.000Z",
  },
];

const NonFriendList = ({ currentUserId, onAddFriend }: NonFriendListProps) => {
  const [selectId, setSelectedId] = useState<string>();

  const nonFriends = dummyUsers.filter((u) => u._id !== currentUserId);

  // ** selected color
  const handleSelected = (id: string) => setSelectedId(id);

  return (
    <div className="flex flex-col divide-y divide-slate-700">
      {nonFriends.map((user) => (
        <div
          onClick={() => handleSelected(user._id)}
          key={user._id}
          className={`flex justify-between items-center p-2 mx-2 rounded-md cursor-pointer
    transition-colors duration-200 hover:bg-slate-600
    ${selectId === user._id ? "bg-slate-700 hover:bg-slate-600" : ""}
  `}
        >
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">
                Last active: {new Date(user.lastActive).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering selection
              onAddFriend(user);
            }}
            className="text-sm bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 active:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default NonFriendList;
