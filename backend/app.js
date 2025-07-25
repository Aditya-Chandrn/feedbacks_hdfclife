import express from "express";
import cors from "cors";
import { config } from "dotenv";

import router from "./routes.js";

config();

const { CLIENT_URL, PORT } = process.env;

const app = express();
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use("/feedback", router);

app.listen(PORT, console.log(`Server listening to port ${PORT}`));
