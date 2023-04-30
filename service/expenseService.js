import client from "../index.js";
async function getAllexpense(username) {
  return await client
    .db("expense-data")
    .collection("expense")
    .find({ username: username })
    .toArray();
}
async function createUser(data) {
  return await client.db("expense-data").collection("expense").insertMany(data);
}
async function getUserByName(username) {
  return await client
    .db("expense-data")
    .collection("expense")
    .findOne({ username: username });
}

async function creatExpense(data, username) {
  return await client
    .db("expense-data")
    .collection("expense")
    .updateOne({ username: username }, { $push: { expense: data } });
}

export default { creatExpense, createUser, getAllexpense, getUserByName };
