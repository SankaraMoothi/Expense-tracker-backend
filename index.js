import express from "express";
import dotenv from "dotenv";
dotenv.config();
import expenseRouter from "./routes/expense.js";
import { MongoClient } from "mongodb";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
// const mongo_url = "mongodb://127.0.0.1";
const mongo_url = process.env.MONGO_URL;

const client = new MongoClient(mongo_url);
client.connect();
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
app.use(`/user`, expenseRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
export default { client };
