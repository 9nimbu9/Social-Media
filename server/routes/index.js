const express = require("express")
const { upload, uploadImage, uploadGet, likes} = require("../controllers/userController")
const { signup, signupGet, signin, follow } = require("../controllers/signController")

const router = express.Router()

router.post("/upload", uploadImage, upload)
router.get("/upload", uploadGet)

router.post("/signUp", signup)
router.get("/signUp", signupGet)

router.post("/signIn", signin)

router.post("/followUpdate", follow)

router.post("/likes", likes) 

module.exports = router  