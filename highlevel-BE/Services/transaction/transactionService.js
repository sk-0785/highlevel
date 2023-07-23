import Transaction from "../../models/TransactionModel.js";
import Wallet from "../../models/WalletModel.js";
import mongoose from "mongoose";

export async function createTransaction(transactDetails) {
  let transSaved = null;
  let walledSaved = null;
  let { walletId, amount, description } = transactDetails;
  amount = parseFloat(amount.toFixed(4));
  try {
    const walletExist = await Wallet.findById(
      mongoose.Types.ObjectId(transactDetails.walletId)
    );
    if (!walletExist)
      return {
        status: 404,
        msg: "wallet id not found",
      };
    if (
      amount < 0 &&
      parseFloat(walletExist.balance.toFixed(4)) <
        parseFloat(amount.toFixed(4)) * -1
    )
      return {
        status: 400,
        msg: "transaction amount is more than wallet balance",
      };

    const transact = new Transaction({
      walletId,
      description,
      amount: parseFloat(amount.toFixed(4)),
      date: new Date(),
      type: amount < 0 ? "debit" : "credit",
      balance:
        parseFloat(walletExist.balance.toFixed(4)) +
        parseFloat(amount.toFixed(4)),
    });
    transSaved = await transact.save();
    walledSaved = await Wallet.updateOne(
      { _id: walletId },
      {
        $set: {
          balance:
            parseFloat(walletExist.balance.toFixed(4)) +
            parseFloat(amount.toFixed(4)),
        },
      }
    );
    return {
      status: 200,
      balance: parseFloat(transSaved.balance.toFixed(4)),
      transactionId: transSaved["_id"],
    };
  } catch (err) {
    if (transSaved && !walledSaved)
      await Transaction.findByIdAndRemove(transSaved["_id"]);
    if (!transSaved && walledSaved)
      await Wallet.updateOne(
        { _id: walletId },
        { $set: { balance: parseFloat(walletExist.balance.toFixed(4)) } }
      );

    return {
      status: 500,
      msg: "internal server error",
    };
  }
}

export async function getTransactionDetails(reqQuery) {
  let { limit, skip, walletId } = reqQuery;
  console.log(reqQuery);
  try {
    skip = Number(skip) || 0;
    limit = Number(limit) || 10;
    if (!walletId) {
      return {
        status: 400,
        msg: "please provide wallet id",
      };
    }
    const walletExist = await Wallet.findById(
      mongoose.Types.ObjectId(walletId)
    );
    if (!walletExist)
      return {
        status: 404,
        msg: "wallet id not found",
      };
    const data = await Transaction.find({
      walletId: mongoose.Types.ObjectId(walletId),
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Transaction.find({
      walletId: mongoose.Types.ObjectId(walletId),
    });

    return {
      status: 200,
      data,
      totalCount: totalCount.length,
      skip,
      limit,
    };
  } catch (err) {
    return {
      status: 500,
      msg: "internal server error",
    };
  }
}
