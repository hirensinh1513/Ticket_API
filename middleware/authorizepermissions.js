const CustomError = require("../errors");

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authorizePermissions,
};
