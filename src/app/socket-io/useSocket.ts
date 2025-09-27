// src/app/hooks/useSocket.ts
"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
        {
          withCredentials: true,
        }
      );
    }
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
};
