const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  serviceName: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    enum: ["normal", "VIP"],
  },
  PriceOptions: {
    type: [Schema.Types.ObjectId],
    ref: "PriceOption",
  },
});

const Service = model("Service", serviceSchema);

module.exports = Service;
