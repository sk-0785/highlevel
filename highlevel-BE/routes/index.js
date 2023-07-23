import express from 'express';
const app = express();
import walletRoutes from "./wallets.js";
import transactionRoutes from './transactions.js'
//Import all routes here
app.use("/wallet", walletRoutes);
app.use("/transaction",transactionRoutes)

export default app;
