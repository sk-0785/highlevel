import Wallet from "../../models/WalletModel.js";

import mongoose from "mongoose";
export async function createOrder(body) {
  try {
    const ifAlreadyExist = await Wallet.exists({ name: body.name });
    if (ifAlreadyExist)
      return {
        status: 400,
        msg: "wallet with same name already exists",
      };
    const walletExist = await new Wallet(body).save();
    console.log(walletExist)
    return {
      status: 200,
      id: walletExist["_id"],
      name: walletExist.name,
      balance: parseFloat(walletExist.balance.toFixed(4)),
      date: walletExist.date,
    };
  } catch (err) {
    return {
      status: 500,
      msg: "internal server error ",
    };
  }
}

export async function getWalletDetails(id) {
  try {
    const walletExist = await Wallet.findOne({
      _id: mongoose.Types.ObjectId(id),
    });
    if (!walletExist) return { status: 404, msg: "wallet details not found" };

    return {
      status: 200,
      id: walletExist["_id"],
      name: walletExist?.name,
      balance: parseFloat(walletExist?.balance.toFixed(4)),
      date: walletExist?.date,
    };
  } catch (err) {
    return {
      status: 500,
      msg: err.msg,
    };
  }
}
