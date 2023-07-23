import * as transactionService from "../Services/transaction/transactionService.js";
import {
  ErrorResponse,
  notFoundResponse,
  validationError,
} from "../helpers/ErrorResponseHandler.js";
import { successResponse } from "../helpers/SuccessResponseHandler.js";
import { schemaValidator } from "../validators/validators.js";

export async function createTransaction(req, res) {
  try {
    const result = schemaValidator(req, res);
    if (!result.isEmpty()) {
      return validationError(res, "Validation failed", result.array());
    }
    const response = await transactionService.createTransaction({
      ...req.body,
      walletId: req.params.walletId,
    });
    console.log(response)
    if (response.status == 200)
      successResponse(res, {
        msg: "transaction created successfully",
        transactionId: response.transactionId,
        balance: parseFloat(response.balance.toFixed(4)),
      });

    if (response.status === 404)
    notFoundResponse(res, { message: response.msg });
    if (response.status == 400) validationError(res, { message: response.msg });
    if (result.status == 500) ErrorResponse(res, error);
  } catch (error) {
    ErrorResponse(res, error);
  }
}

export async function getTransactionDetails(req, res) {
  try {
    const response = await transactionService.getTransactionDetails(req.query);
    console.log(response)
    if (response.status == 200)
      successResponse(res, {
        msg: "transaction details fetched successfully",
        data: response.data,
        skip: response.skip,
        limit: response.limit,
        totalCount: response.totalCount,
      });
    if (response.status === 404)
      notFoundResponse(res, { message: response.msg });
    if (response.status == 400) validationError(res, { message: response.msg });
    if (response.status == 500) ErrorResponse(res, error);
  } catch (error) {
    console.log(
      "Error in transactiionController::getTransactionDetails",
      error
    );
    ErrorResponse(res, error);
  }
}
