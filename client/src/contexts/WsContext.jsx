import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const wsContext = createContext();

const opts = {
  transports: ["polling"],
  reconnectionAttempts: 5,
  withCredentials: true,
};

const WsProvider = ({ children }) => {
    const [conn, setConn] = useState(null);

    useEffect(() => {
        const ws = io(import.meta.env.VITE_API_URL_DEV, opts);

        ws.on("connect", () => {
            setConn(ws);
        });

        return () => {
            ws.disconnect();
        };
    }, []);

    return <wsContext.Provider value={{ conn }}>{children}</wsContext.Provider>;
};

export default WsProvider;