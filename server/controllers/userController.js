const multer = require("multer")
const mongoose = require("mongoose")
const fs = require('fs')
var path = require("path");

const tweetImageSchema = new mongoose.Schema({
    tweet: String,
    img: {
        data: Buffer,
        contentType: String
    },
    userId: String,
    l: [{
        like: {
            type: String,
            default: false
        },
        likedBy: {
            type: String,
            default: " "
        }
    }],
    count: {
        type: Number,
        default: 0
    },
    tweetId: String,
    time: Number
})
const TweetImages = mongoose.model("TweetImage", tweetImageSchema)

const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
 
const upload = multer({
    storage: multerConfig,
}) 

exports.uploadImage = upload.single('photo')

exports.upload = (req,res) => {
    console.log(req.body)
    if(req.file!=undefined){
        const tweetImage = new TweetImages({
            tweet: req.body.tweet,
            img: {
                data: fs.readFileSync(path.join("C:/Social Media/server/public/" + req.file.filename)),
                contentType: 'image/jpg'
            },
            userId: req.body.userId,
            time: Date.now()
        })
        tweetImage.save()
    }else{
        const tweetImage = new TweetImages({
            tweet: req.body.tweet,
            userId: req.body.userId,
            time: Date.now()
        })
        tweetImage.save()
    }
    res.status(200).json({
        success: 'Success'
    })
}

exports.uploadGet = (req,res) => {
    TweetImages.find({}, (err, images) => {
        res.json(images)
    }).sort('-time').exec((err, docs) => {});
} 

exports.likes = (req,res) => {
    var present
    console.log(req.body.likes)
    TweetImages.findById({_id: req.body.likedOn}, function(err, found){
        if(found.l.length!==0){
            for(var i = 0; i<found.l.length;i++){
                if(found.l[i].likedBy===req.body.likedBy){
                    present=true
                }else{
                    present=false
                }
            }
        }else{
            present=false
        }
        if(present){
            if(req.body.likes){
                TweetImages.findOneAndUpdate({_id: req.body.likedOn,'l.likedBy':req.body.likedBy}, {$set: {"l.$.like": req.body.likes}}, function(err, update){})
            }else{
                TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$pull: {l: {likedBy: req.body.likedBy}}}, function(err, update){})
            }
        }else{
            if(req.body.likes){
                TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$push: {l: {like: req.body.likes, likedBy: req.body.likedBy}}}, function(err, update){})
            }else{
                TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$pull: {l: {likedBy: req.body.likedBy}}}, function(err, update){})
            }
            // console.log(found.l)
        }
        // TweetImages.findById({_id: req.body.likedOn}, function(err, found){
        //     console.log(found.l)
        //     console.log(found.l.length)
        // })
        // var len = found.l.length
        // TweetImages.findByIdAndUpdate({_id: req.body.likedOn}, {$set: {count: len}}, function(err, update){})
    })
}


exports.deleteTweet = (req,res) => {
    TweetImages.findByIdAndRemove(req.body.delete, (err, dT) => {
        if(err){
            console.log(err)
        }
    })
}
