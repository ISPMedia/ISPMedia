import express, { Express } from "express";
import path from "path";
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
app.listen(PORT, () => {
  console.log("HTTP server running!");
});
