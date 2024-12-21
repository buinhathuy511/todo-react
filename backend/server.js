const createServer = require("http").createServer;
const router = require("./routes");
const connectDB = require("./utils/mongodb");
const cors = require("cors");
const hostname = "127.0.0.1";
const port = 4000;
const constants = require("./utils/constants");

// Connect to MongoDB
connectDB();

const server = createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
    "OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Nếu request method là OPTIONS thì trả về 204
  if (req.method === "OPTIONS") {
    res.writeHead(constants.httpStatusCodes.NO_CONTENT);
    res.end();
    return;
  }
  router.run(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
