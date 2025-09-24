import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    // ** Event listeners for connection status
    socketRef.current.on("connect", () => {
      console.log("✅ Connected to socket:", socketRef.current?.id);
    });

    //** Event listener for disconnection
    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
};
