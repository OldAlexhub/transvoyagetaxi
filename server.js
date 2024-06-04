import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import connectToDB from "./db/connectToDb.js";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "64mb", extended: true }));
app.use(express.urlencoded({ limit: "64mb", extended: true }));

connectToDB();

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
