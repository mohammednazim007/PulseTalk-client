"use client";
import UserActionButtons from "@/app/shared/UserButtonCard/UserActionButtons";
import { formatLastSeenTime } from "@/app/utility/formatLastSeenTime";
import Image from "next/image";
import { useState } from "react";

const nonFriends = [
  {
    _id: "68f0dc7875b5c41732fa20ab",
    name: "Admin",
    email: "admin@gmail.com",
    password: "$2b$10$i8gcPQwECP1dRQyf9jfmD.uJixVmeH2UY2WNBVfFPP1yvYHsfgdnC",
    avatar:
      "https://res.cloudinary.com/dpelhoupo/image/upload/v1760615578/uploads/e9u6ggcnwoycj8yifl9a.jpg",
    isFriend: false,
    friends: [],
    friendRequests: [],
    sentRequests: [],
    blockedUsers: [],
    lastActive: "2025-10-16T11:52:24.398Z",
  },

  {
    _id: "68f0dcf875b5c41732fa20b5",
    name: "Mohammed Nazim",
    email: "mohammednazim3629@gmail.com",
    password: "$2b$10$Jx7N00vIaZci5BnAnjkVGeNFRv59uNgqwAW22YXx7elSXL6IrmamC",
    avatar:
      "https://res.cloudinary.com/dpelhoupo/image/upload/v1760615699/uploads/rmxhvszscpdbmsfdzrqt.jpg",
    isFriend: false,
    friends: [],
    friendRequests: [],
    sentRequests: [],
    blockedUsers: [],
    lastActive: "2025-10-16T11:54:32.256Z",
  },

  {
    _id: "68f0dd3075b5c41732fa20bd",
    name: "Forash",
    email: "forash@gmail.com",
    password: "$2b$10$Hptz/jWh8mCxEiTJ8wF8i.ghUvMEbWTZXL3w/7dStcOtoGDwPaK9W",
    avatar: "",
    isFriend: false,
    friends: [],
    friendRequests: [],
    sentRequests: [],
    blockedUsers: [],
    lastActive: "2025-10-16T11:55:28.186Z",
  },
];

const NonFriendList = () => {
  const [selectId, setSelectedId] = useState<string>();

  // ** selected color
  const handleSelected = (id: string) => setSelectedId(id);

  return (
    <div className="flex flex-col divide-y divide-slate-700">
      {nonFriends.map((user) => (
        <div
          onClick={() => handleSelected(user._id)}
          key={user._id}
          className={`flex justify-between items-center p-3 
            rounded-md cursor-pointer
            transition-colors duration-200 hover:bg-slate-700/50
            ${selectId === user._id ? "bg-slate-700 hover:bg-slate-700/50" : ""}
          `}
        >
          {/* START: WRAPPER FOR AVATAR AND NAME */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* 1. Avatar Indicator (Flex-shrink to ensure it stays in place) */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-50">
                {user.avatar ? (
                  <div>
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            {/* 2. User Info (Name) - MOVED OUTSIDE THE AVATAR DIV */}
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">
                {user.name || "Unknown"}
              </h2>
              <p className={`text-xs text-gray-400`}>
                {formatLastSeenTime(user?.lastActive)}
              </p>
            </div>
          </div>
          {/* END: WRAPPER FOR AVATAR AND NAME */}

          {/* New div to hold both buttons, using flex to align them */}
          <div className="flex gap-2 flex-shrink-0">
            {/* The UserActionButtons component from your previous request */}
            <UserActionButtons user={user} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NonFriendList;
