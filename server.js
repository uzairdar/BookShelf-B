const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
const uri =
  process.env.ATLAS_URI ||
  "mongodb+srv://bookshelf-app:bookshelf123@cluster0.t4mie.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   serverApi: ServerApiVersion.v1,
});

const connection = mongoose.connection;
try {
  connection.once("open", () => {
    console.log("Mongoose Connection established");
  });
} catch (error) {
  console.log(error);
}
const userRouter = require("./routes/User");
const shelfRouter = require("./routes/Shelf");

app.use("/api/user", userRouter);
app.use("/api/shelf", shelfRouter);
server.listen(port, () => {
  console.log("server is listening on port : ", port);
});
