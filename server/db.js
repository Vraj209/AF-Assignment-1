
const { MongoClient } = require("mongodb");

const URL = "mongodb+srv://vraj:vraj@cluster0.vvom5a6.mongodb.net/AdvancedFullStckAssignment?retryWrites=true&w=majority";
let db;

const dbConnect = async () => {
  if (!db) {
    const client = new MongoClient(URL);
    await client.connect();
    db = client.db();
  }
  console.log("***** Database Connected *****");
};

const getEmpolyeeData = async () => {
  if (!db) await dbConnect();
  return db.collection("employees");
};

module.exports = {
  dbConnect,
  getEmpolyeeData,
};
