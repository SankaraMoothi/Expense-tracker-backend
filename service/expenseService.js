import { client } from "../index.js";
export async function getAllexpense(username) {
  return await client
    .db("expense-data")
    .collection("expense")
    .find({ username: username })
    .toArray();
}
export async function createUser(data) {
  return await client.db("expense-data").collection("expense").insertMany(data);
}
export async function getUserByName(username) {
  return await client
    .db("expense-data")
    .collection("expense")
    .findOne({ username: username });
}

export async function creatExpense(data, username) {
  return await client
    .db("expense-data")
    .collection("expense")
    .updateOne({ username: username }, { $push: { expense: data } });
}
