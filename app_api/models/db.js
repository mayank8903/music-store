var mongoose = require("mongoose");

var dbUri =
  "mongodb+srv://Divyaraj:Divyaraj@cluster0.trj2i.mongodb.net/test";

mongoose.connect(dbUri, { dbName: "musicSchema" });
//check connection
mongoose.connection.on("connected", function () {
  console.log("Mongoose db connected");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
//connection close
var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});
require("./music");
require("./customer");
