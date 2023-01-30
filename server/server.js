const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const userUpload = require('./routes/index')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use(cors())

app.use("/", userUpload)

mongoose.connect("mongodb://localhost:27017/socialDB")
app.listen(5000, () => {console.log("Server 5000")})