import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cors from "cors";

const app = express();

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Listening on port", port);
});

app.use(cors());

app.use(express.json());

router(app);
