// import React from "react";

// const MessageArea = () => {
//   return (
//     <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//       <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
//         <p className="text-sm">
//           What do you think about our plans for this product launch?
//         </p>
//         <span className="block text-right text-xs text-gray-400">09:25</span>
//       </div>

//       <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
//         <p className="text-sm">
//           It looks to me like you have a lot planned before your deadline. I
//           would suggest you push your deadline back so you have time to run a
//           successful campaign.
//         </p>
//         <span className="block text-right text-xs text-gray-400">09:28</span>
//       </div>

//       {/* Right Side Messages */}
//       <div className="flex justify-end">
//         <div className="max-w-sm p-3 rounded-lg bg-blue-600">
//           <p className="text-sm">
//             I would suggest you discuss this further with the advertising team.
//           </p>
//           <span className="block text-right text-xs text-gray-200">09:41</span>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <div className="max-w-sm p-3 rounded-lg bg-blue-600">
//           <p className="text-sm">
//             I am very busy at the moment and on top of everything, I forgot my
//             umbrella today.
//           </p>
//           <span className="block text-right text-xs text-gray-200">09:41</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;
"use client";
import React from "react";

interface Message {
  senderId: string;
  room: string;
  content: string;
  createdAt?: string;
}

interface MessageAreaProps {
  messages: Message[];
  socketId?: string;
}

const MessageArea = ({ messages, socketId }: MessageAreaProps) => {
  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      {messages.map((msg, idx) =>
        msg.senderId === socketId ? (
          // 👉 Right side (my messages)
          <div key={idx} className="flex justify-end">
            <div className="max-w-sm p-3 rounded-lg bg-blue-600 text-white">
              <p className="text-sm">{msg.content}</p>
              <span className="block text-right text-xs text-gray-200">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          </div>
        ) : (
          // 👉 Left side (friend messages)
          <div
            key={idx}
            className="max-w-sm p-3 rounded-lg bg-[#334155] text-slate-100"
          >
            <p className="text-sm">{msg.content}</p>
            <span className="block text-right text-xs text-gray-400">
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default MessageArea;
