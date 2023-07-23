
import mongoose from "mongoose";
const { Schema, model } = mongoose

const TransactionSchema = new Schema(
  {
    description: {
      type: String,
    },
    walletId: {
      type: Schema.Types.ObjectId, 
      ref:'Wallet'
    },
    amount: {
      type: Number,
      required: true,
    },
    balance:{
      type: Number,
      required: true,
    },
    type:{
      type: String,
      enum: ['credit','debit'], // Specify the enum values for the field
      required: true
    },
    date: {
        type: Date,
        required: true,
      },
  }
);
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;