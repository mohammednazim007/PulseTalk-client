"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import MessageArea from "./Message-area";
import InputArea from "./InputArea";
import HeaderArea from "./HeaderArea";
import NoChatSelected from "../../shared/NoChatSelected/NoChatSelected";

interface ChatAreaProps {
  onToggleSidebar: () => void;
}

const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
  const { activeUser, loading } = useAppSelector((state) => state.user);
  console.log("activeUser", activeUser);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#0f172a] text-slate-100">
      {/* Header */}
      <HeaderArea onToggleSidebar={onToggleSidebar} />

      {/* ✅ Main scrollable section */}
      <div className="flex-1 min-h-0 flex flex-col">
        {!activeUser ? <NoChatSelected /> : <MessageArea />}
      </div>

      {/* Input area */}
      {activeUser && (
        <div className="flex-shrink-0">
          <InputArea />
        </div>
      )}
    </div>
  );
};

export default ChatArea;
