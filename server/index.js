// express 서버 설정

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/", userRoutes);

app.get("/", (req, res) => res.send("Hello!! From Express"));
app.all("*", (req, res) => res.send("This route doesn't exist"));

app.listen(port, () =>
  console.log(`Server is listening on port : http://localhost:${port}`)
);
