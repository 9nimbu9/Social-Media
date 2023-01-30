const mongoose = require("mongoose")

const signSchema = new mongoose.Schema({
    name:String,
    email: String,
    userName: String,
    password: String,
    followId: [String]
})
const Signs = new mongoose.model("Sign", signSchema)

exports.signup = (req,res) => {
    console.log(req.body)
    const Sign = new Signs({
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
    })   
    Sign.save()
    res.json(Sign._id)  
} 
exports.signupGet = (req,res) => {
    Signs.find({}, (err, userData) => {
        res.json(userData)
    })
}

exports.signin = (req, res) => {
    Signs.findOne({userName: req.body.userName}, function(err, foundUser){
        if(foundUser){
            if(foundUser.password===req.body.password){
                res.json(foundUser._id)
            }else{
                res.json(404)
            }
        }else{
            res.json(404)
        }
    }) 
}

exports.follow = (req,res) => {
    Signs.findByIdAndUpdate({_id: req.body.userId}, {$push :{followId: req.body.followId}}, function(err, update){
        console.log("Updated: "+update)
    })
}