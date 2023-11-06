const { Schema, model } = require("mongoose");

const priceSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  Duration: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    enum: ["Hourly", "Monthly", "Weekly"],
  },
});

const PriceOption = model("PriceOption", priceSchema);

module.exports = PriceOption;
