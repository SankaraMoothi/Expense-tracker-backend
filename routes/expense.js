import express from "express";

import jwt from "jsonwebtoken";

const router = express.Router();
import bcrypt from "bcrypt";
import { auth } from "../middleware/auth.js";
import getAllexpense from "../service/expenseService.js";
import createUser from "../service/expenseService.js";
import getUserByName from "../service/expenseService.js";
import creatExpense from "../service/expenseService.js";

router.get("/expense", auth, async function (req, res) {
  const username = req.header("username");

  if (username) {
    const expense = await getAllexpense(username);
    res.status(200).json(expense[0].expense);
  } else {
    res.status(401).json("Something Went Worng Token...");
  }
});

router.post("/register", async function (req, res) {
  const { username, password, email } = req.body;
  const userFromDB = await getUserByName(username);
  if (userFromDB) {
    res.status(400).send({ message: "user Already Exist" });
  } else {
    const hashedPassword = await generateHashedPass(password);
    const data = [{ username, password: hashedPassword, email, expense: [{}] }];
    const user = await createUser(data);
    res.status(200).send(user);
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userFromDB = await getUserByName(username);
  if (!userFromDB) {
    res.status(400).send({ message: "invalid credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      res
        .status(200)
        .send({ message: "Sucessfully Login", token: token, username });
    } else {
      res.status(400).send({ message: "invalid credentials" });
    }
  }
});
router.post("/create", auth, async (req, res) => {
  const { price, name, datetime, description } = req.body;

  const username = req.header("username");
  const data = { price, name, datetime, description };

  const expense = await creatExpense(data, username);
  res.status(200).json(expense);
});
export default router;

async function generateHashedPass(pass) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
}
