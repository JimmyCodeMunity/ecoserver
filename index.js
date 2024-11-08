const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/ProductModel");
const Events = require("./models/EventModel");
const productRoute = require("./routes/ProductRoute");
const shopRoute = require("./routes/ShopRoutes");
const supplierRoute = require("./routes/SupplierRoute");
const adRoute = require("./routes/AdRoute");
const resellerRoute = require("./routes/ResellerRoute");
const categoryRoute = require("./routes/CategoryRoute");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(cors());

//allow json requests to be sent to the server
app.use(express.json());

//allow url encoded for from input
app.use(express.urlencoded({ extended: false }));

// socket initialization
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     // origin: ["http://localhost:3000", "http://localhost:3001","https://cbfe-41-139-202-31.ngrok-free.app"], // Add multiple origins here
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// const userSocketMap = {};

// socket connection
// io.on("connection", (socket) => {
//   console.log("user connected successfully", socket.id);
//   const userId = socket.handshake.query.userId;
//   console.log("userid", userId);

//   if (userId !== "undefined") {
//     userSocketMap[userId] = socket.id;
//   }
//   console.log("user socket map", userSocketMap);
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
//     console.log("user socket map after disconnect", userSocketMap);
//   });


//   socket.on("sendMessage",({senderId,receiverId,message})=>{
//     const receiverSocketId = userSocketMap[receiverId];
//     // console.log("receiverSocketId", receiverSocketId);
//     // console.log("receiverId", receiverId);
//     // console.log("message", message);
//     // console.log("senders id", senderId);
//     // const sendingfrom = senderId;
    
//     if(receiverSocketId){
//       // sendMessage(userid,senderId, receiverId, message,receiverSocketId)
//       // io.to(receiverSocketId).emit("newMessage", {senderId:sendingfrom, receiverId, message});
//       sendMessage(io, receiverSocketId, senderId, receiverId, message);
//     }
//   })
// });

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

const port = process.env.PORT;
const db = process.env.DB_URL;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port} at ${db}`);
});

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err.message));
//strict query
mongoose.set("strictQuery", true);

app.use("/api/product", productRoute);
app.use("/api/user", resellerRoute);
app.use("/api/shop", supplierRoute);
app.use("/api/ads", adRoute);
app.use("/api/category", categoryRoute);

app.get("/", (req, res) => {
  res.send("Server started");
});

app.get("/productlist", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log("error fetching");
    res.status(500).json({ message: error.message });
  }
});
