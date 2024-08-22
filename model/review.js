const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    material: {
      type: Schema.Types.ObjectId,
      ref: "Material",
    },

    user: 
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

    rating: {
      type: Number,
      require: true,
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
