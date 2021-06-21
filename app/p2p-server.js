// Peer 2 Peer Server

/*
Test run 3 servers:
npm run dev
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
*/

const Websocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({
      port: P2P_PORT,
    });
    server.on("connection", (socket) => {
      this.connectSocket(socket);
    });
    this.connectToPeers();
    console.log(`Listening for peer-to-peer connections on port ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new Websocket(peer);
      socket.on("open", () => {
        this.connectSocket(socket);
      });
    });
  }

  connectSocket(socket) {
    this.sockets.push;
    console.log("Socket connected");
  }
}

module.exports = P2pServer;
