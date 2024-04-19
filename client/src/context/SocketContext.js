import React, { createContext, useContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useQR } from "./QRContext";
import { useCart } from "./CartContext";

const SOCKET_URL = "http://localhost:3001/";
const SocketContext = createContext();
const socket = socketIOClient(SOCKET_URL, { withCredentials: true });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { clearQRData } = useQR();
  const { clearCart } = useCart();

  useEffect(() => {
    const handleClearStorage = () => {
      clearCart();
      clearQRData();
    };

    socket.on("clear-storage", handleClearStorage);

    return () => {
      socket.off("clear-storage", handleClearStorage);
    };
  }, [clearCart, clearQRData]);

  const emitEvent = (eventName, data) => {
    socket.emit(eventName, data);
  };

  const listenEvent = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  const unlistenEvent = (eventName) => {
    socket.off(eventName);
  };

  return <SocketContext.Provider value={{ emitEvent, listenEvent, unlistenEvent }}>{children}</SocketContext.Provider>;
};
