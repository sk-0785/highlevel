import express from 'express';
const router = express.Router();
import { createWallet,getWalletDetails } from "../controllers/walletController.js";
import { validate } from '../validators/validators.js'

router.post("/", validate('createWallet'), createWallet);
router.get("/:walletId", validate('walletDetails'), getWalletDetails);

export default router;
