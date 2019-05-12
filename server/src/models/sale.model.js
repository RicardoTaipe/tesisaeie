const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: String, required: true },
  total_value: { type: Number },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: { type: Number }
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Sale", saleSchema);
