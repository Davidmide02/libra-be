const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    materials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Material",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    satus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
