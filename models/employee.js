const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EmployeeSchema = new mongoose.Schema(
  {
    initialName: {
      type: String,
      required: true,
      enum: ["MR", "MS", "MRS"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      minlength: 6,
      maxlength: 30,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    designation: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee", "manager"],
      default: "employee",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

EmployeeSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

EmployeeSchema.methods.createJWT = function () {
  return jwt.sign(
    { employeeId: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

EmployeeSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Employee", EmployeeSchema);
