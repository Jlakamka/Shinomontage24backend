const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

const port = 5000;
const corsOptions = {
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["*"],
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  transports: ["websocket", "polling"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`)); //Строка 6
// Маршрут для обработки GET-запросов.
app.get("/", (req, res) => {
  res.send("Welcome to the Express web server!");
});

let recordsList = JSON.parse(fs.readFileSync("./records.json" || ""));
// Маршрут для обработки POST-запросов.
fs.open("./records.json/", "r", (err, fd) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(fd);
});

app.post("/record/", (req, res) => {
  addRecord(req.body);
  res.send(JSON.stringify({ res: "ok" }));
});
app.get("/records", (req, res) => {
  res.send(recordsList);
});
async function addRecord(record) {
  console.log(record);
  console.log(recordsList);
  recordsList = JSON.parse(fs.readFileSync("./records.json"));
  console.log(recordsList.recordsList);
  recordsList.recordsList.unshift(record);
  fs.writeFile("./records.json", JSON.stringify(recordsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //файл записан успешно
  });
  console.log(JSON.stringify({ recordsList, record }));
}
