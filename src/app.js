const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")


const app = express()

app.use(express.json()) //middleware to parse JSON bodies
app.use(cookieParser()) //middleware to parse cookies

app.use("/api/auth",authRouter)



module.exports = app