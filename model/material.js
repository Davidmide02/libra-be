const mongoose = require("mongoose");
// const schema = mongoose.Schema();

const materialSchema = new mongoose.Schema(
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
    bookState: {
      type: String,
      require: true,
      default: "avilable",
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;
