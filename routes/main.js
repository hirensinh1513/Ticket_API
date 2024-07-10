const express = require("express");
const router = express.Router();
const { authorizePermissions } = require("../middleware/authorizepermissions");

const {
  getAllEmpDetails,
  getSingleEmpDetails,
  updateEmpDetails,
  deleteEmpdetails,
} = require("../controllers/main");

router
  .route("/")
  .get(authorizePermissions("admin", "manager"), getAllEmpDetails);
router.route("/mydetails").get(getSingleEmpDetails);
router
  .route("/:id")
  .patch(authorizePermissions("admin", "manager"), updateEmpDetails);
router.route("/:id").delete(authorizePermissions("admin"), deleteEmpdetails);

module.exports = router;
