const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: Array,
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    isavailabe: {
      type: Boolean,
      require: true,
      default: true,
    },
    reviews: [  
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Request",
      },
    ],
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;
