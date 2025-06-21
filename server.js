const express = require("express");
const cors = require("cors");
const app = express();
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

const recordsList = [
  { day: "18", time: "22:22", type: "test", id: "test2" },
  { day: "12", time: "23:22", type: "test", id: "test3" },
  { day: "13", time: "12:22", type: "test", id: "test5" },
  { day: "17", time: "19:22", id: "test9" },
];
// Маршрут для обработки POST-запросов.
app.post("/record/", (req, res) => {
  const test = req.body;
  recordsList.unshift(test);
  console.log(test);
  res.send(JSON.stringify({ res: "ok" }));
});
app.get("/records", (req, res) => {
  res.send(recordsList);
});
