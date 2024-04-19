const socketIO = require("socket.io");

const tableTimers = new Map();

const initSockets = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("join-table", (tableId) => {
      socket.join(`table-${tableId}`);
      console.log(`User ${socket.id} joined table ${tableId}`);
    });

    socket.on("request-bill", (tableId) => {
      if (tableTimers.has(tableId)) {
        clearTimeout(tableTimers.get(tableId));
      }

      const timer = setTimeout(() => {
        io.in(`table-${tableId}`).emit("clear-storage");
        tableTimers.delete(tableId);
      }, 10 * 1000);

      tableTimers.set(tableId, timer);
      io.in(`table-${tableId}`).emit("timer-started", tableId);
    });
  });
};

module.exports = initSockets;
