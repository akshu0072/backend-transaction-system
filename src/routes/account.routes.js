const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");



const router = express.Router();

/**
 * - POST /api/accounts
 * - Create a new account
 * - protected route
 */

router.post("/", authMiddleware.authMiddleware, accountController.createAccountController);


/**
 * get /api/accounts/:id
 * Get all accounts of a logged in user
 * protected route
 */

router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController);

/**
 * get /api/accounts/balance/:accountId
 * Get account details by ID
 * protected route
 */

router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountsBalanceController);


module.exports = router;