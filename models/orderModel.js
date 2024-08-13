import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    products: {
      type: mongoose.ObjectId,
      ref: "Product",
    },
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      defult: "Not Process",
      enum: ["Note Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
