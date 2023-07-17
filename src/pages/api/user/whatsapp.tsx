import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false
  }
};

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      path: "/api/user/whatsapp",
      addTrailingSlash: false
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
