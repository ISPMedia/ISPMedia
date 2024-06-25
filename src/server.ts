import express, { Express } from "express";
import https from "https";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { initialData } from "./data/ispmedia";
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api", rootRouter);

initialData();
app.get("/", (req, res) => {
  return res.send("Messi");
});
https
  .createServer(
    {
      key: fs.readFileSync("certificates/key.pem"),
      cert: fs.readFileSync("certificates/cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log("HTTPS server running!");
  });
