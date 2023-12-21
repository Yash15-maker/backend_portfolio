import express from "express";
import dotenv from "dotenv";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();
dotenv.config();

import cors from "cors";
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors());

app.use(express.json());

app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
