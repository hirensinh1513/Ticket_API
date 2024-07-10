const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const UnauthorizedError = require("./unauthorized");
const BadRequestError = require("./bad-request");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
};
