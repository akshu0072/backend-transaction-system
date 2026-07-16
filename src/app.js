const express = require("express")
const cookieParser = require("cookie-parser")

/**
 * Route for user authentication
 */
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")    



const app = express()

app.use(express.json()) //middleware to parse JSON bodies
app.use(cookieParser()) //middleware to parse cookies

app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRoutes)



module.exports = app