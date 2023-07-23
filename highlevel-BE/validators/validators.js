import { body, param, query, validationResult } from 'express-validator';

export function validate(method) {
  switch (method) {
    case 'createWallet': {
      return [
        body(`name`, `name is required field`).exists().isString().isLength({ min: 1 }),
        body(`name`, `please provide valid name `).isLength({ min: 1 }),
        body('balance').exists().isNumeric()
      ]
    }
    case 'walletDetails': {
      return [
        param('walletId', 'wallet id is required').exists()
      ]
    }
    case 'createTransaction': {
      return [
        body(`description`, `description is required field`).exists().isString(),
        body('amount',`amount is required field`).exists().isNumeric()
      ]
    }
    case 'getTransactions': {
      return [
        query('wallet').exists()
      ]
    }
  }
}

export function schemaValidator(req, res) {
  return validationResult(req);
}
