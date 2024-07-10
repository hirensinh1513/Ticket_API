const Employee = require("../models/employee");
const NotFoundError = require("../errors/not-found");
const { StatusCodes } = require("http-status-codes");

const getAllEmpDetails = async (req, res) => {
  try {
    const employee = await Employee.find({});
    res.status(StatusCodes.OK).json({ employee, count: employee.length  });
  } catch (error) {
    console.log(error);
  }
};

const getSingleEmpDetails = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new CustomError.NotFoundError(
        `No employee found with ID: ${employeeId}`
      );
    }
    res.status(StatusCodes.OK).json({ employee });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateEmpDetails = async (req, res) => {
  try {
    const { id: employeeID } = req.params;
    const employee = await Employee.findOneAndUpdate(
      { _id: employeeID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!employee) {
      throw new NotFoundError(`No employee with id ${employeeID}`);
    }
    res.status(StatusCodes.OK).json({ employee });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmpdetails = async (req, res) => {
  try {
    const { id: employeeID } = req.params;
    const employee = await Employee.findOneAndUpdate(
      { _id: employeeID },
      { $set: { deleted: true, deletedAt: new Date() } },
      { new: true }
    );
    if (!employee) {
      throw new NotFoundError(`No employee with id ${employeeID}`);
    }
    res.status(StatusCodes.OK).json({ employee });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEmpDetails,
  getSingleEmpDetails,
  updateEmpDetails,
  deleteEmpdetails,
};
