import mongoose from "mongoose";
const { Schema, model } = mongoose

const WalletSchema = new Schema(
  {
    name: {
      type: String,
      unique:true,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  }
);
const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;
