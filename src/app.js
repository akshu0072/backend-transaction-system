const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors");

/**
 * Route for user authentication
 */
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")    



const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json()) //middleware to parse JSON bodies
app.use(cookieParser()) //middleware to parse cookies

app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRoutes)



module.exports = app