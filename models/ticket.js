const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide user"],
    },
    applicationdate: {
      type: String,
      required: [true, "Please Enter Application-date"],
    },
    relatedTo: {
      type: String,
      required: true,
      enum: ["Network", "Hardware", "Accounts", "others"],
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    howManyDaysClosed: {
      type: Number,
      default: 0,
      required: true,
    },
    timeDays: {
      type: Number,
      default: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "pending", "closed"],
      default: "pending",
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    resolvedBy: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
