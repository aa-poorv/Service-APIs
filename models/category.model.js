const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

categorySchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "categoryId",
});

const Category = model("Category", categorySchema);

module.exports = Category;
