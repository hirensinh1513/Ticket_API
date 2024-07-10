const Ticket = require("../models/ticket");
const Employee = require("../models/employee");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");

const getAllTicketDetails = async (req, res) => {
  try {
    const ticket = await Ticket.find({}).sort("createdAt");
    res.status(StatusCodes.OK).json({ ticket, count: ticket.length });
  } catch (error) {
    console.log(error);
  }
};

const getSingleTicketdetails = async (req, res) => {
  const employeeId = req.employee.employeeId;
  const ticket = await Ticket.findOne({
    createdBy: employeeId,
  });
  if (!ticket) {
    throw new NotFoundError(`No ticket with id ${employeeId}`);
  }
  res.status(StatusCodes.OK).json({ ticket });
};

const createTicketDetails = async (req, res) => {
  req.body.createdBy = req.employee.employeeId;
  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ ticket });
};

const updateTicketDetails = async (req, res) => {
  try {
    const { id: ticketID } = req.params;
    const ticket = await Ticket.findOneAndUpdate({ _id: ticketID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticket) {
      throw new NotFoundError(`No ticket with id ${ticket}`);
    }
    res.status(StatusCodes.OK).json({ ticket });
  } catch (error) {
    console.log(error);
  }
};

const deleteTicketdetails = async (req, res, next) => {
  try {
    const { id: ticketID } = req.params;
    const ticket = await Ticket.findOneAndDelete({ _id: ticketID });
    res.status(StatusCodes.OK).json({ ticket });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTicketDetails,
  getAllTicketDetails,
  updateTicketDetails,
  getSingleTicketdetails,
  deleteTicketdetails,
};
