import * as walletService from "../Services/wallet/walletService.js";
import {
  ErrorResponse,
  notFoundResponse,
  validationError,
} from "../helpers/ErrorResponseHandler.js";
import { successResponse } from "../helpers/SuccessResponseHandler.js";
import { schemaValidator } from "../validators/validators.js";

export async function createWallet(req, res) {
  try {
    const resul = schemaValidator(req, res);
    if (!resul.isEmpty()) {
      return validationError(res, "Validation failed", resul.array());
    }
    const result = await walletService.createOrder({
      name: req.body.name,
      balance: parseFloat(req.body.balance.toFixed(4)),
      date: new Date(),
    });
    if (result.status == 200)
      successResponse(res, {
        msg: "Wallet created successfully",
        id: result.id,
        name: result.name,
        balance: parseFloat(result.balance.toFixed(4)),
        date: result.date,
      });
    if (result.status === 404) notFoundResponse(res, { message: result.msg });
    if (result.status == 400) validationError(res, { message: result.msg });
    if (result.status == 500) ErrorResponse(res, result.msg);
  } catch (error) {
    ErrorResponse(res, error);
  }
}

export async function getWalletDetails(req, res) {
  try {
    const { walletId } = req.params;
    if (!walletId) validationError(res, { message: response.msg });
    const result = await walletService.getWalletDetails(walletId);
    successResponse(res, {
      msg: "wallet details fetched successfully",
      id: result.id,
      name: result.name,
      balance: parseFloat(result.balance.toFixed(4)),
      date: result.date,
    });
    if (result.status === 404) notFoundResponse(res, { message: result.msg });
    if (result.status == 400) validationError(res, { message: result.msg });
    if (result.status == 500) ErrorResponse(res, result.msg);
  } catch (error) {
    ErrorResponse(res, error);
  }
}
