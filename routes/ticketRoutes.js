const express = require("express");
const router = express.Router();
const { authorizePermissions } = require("../middleware/authorizepermissions");
const {
  createTicketDetails,
  getAllTicketDetails,
  updateTicketDetails,
  getSingleTicketdetails,
  deleteTicketdetails,
} = require("../controllers/ticket");

router
  .route("/")
  .post(createTicketDetails)
  .get(authorizePermissions("admin", "manager"), getAllTicketDetails);
router.route("/myTicket").get(getSingleTicketdetails);
router
  .route("/:id")
  .patch(authorizePermissions("admin", "manager"), updateTicketDetails)
  .delete(authorizePermissions("admin"), deleteTicketdetails);

module.exports = router;
