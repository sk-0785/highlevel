import express from 'express';
const router = express.Router();
import { createTransaction, getTransactionDetails } from "../controllers/transactionController.js";
import { validate } from '../validators/validators.js'

router.post("/:walletId", validate('createTransaction'), createTransaction);
router.get("/",validate('getTransactions'), getTransactionDetails);

export default router;
