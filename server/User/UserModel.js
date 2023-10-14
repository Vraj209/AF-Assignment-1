const { getEmpolyeeData } = require("../db");

const getAllEmployees = async () => {
  const instance = await getEmpolyeeData();
  return instance.find({}).toArray();
};
const createNewEmployee = async (emp) => {
  const instance = await getEmpolyeeData();
  const employee = await instance.insertOne(emp);
  return emp;
};

module.exports = {
  createNewEmployee,
  getAllEmployees,
};
