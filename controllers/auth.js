const Employee = require("../models/employee");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const employee = await Employee.create({ ...req.body });
  const token = employee.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ employee: { email: employee.email, role: employee.role }, token });
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new BadRequestError("Please provide email,password and role");
  }
  const employee = await Employee.findOne({ email, role });
  if (!employee) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await employee.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = employee.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ employee: { email: employee.email, role: employee.role }, token });
};

module.exports = {
  register,
  login,
};
