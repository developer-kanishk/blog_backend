//like a post
const { Op } = require("sequelize");

const Like = require('../models/likeModel');
const user = require("../models/userModel");
module.exports.likePost = async function likePost(req,res){
    try{
        //check if post id is valid
        const postId = req.body.postid

        const like = Like.build({
            userid:req.id,
            postid:postId   
        })

        await like.save()

        return res.json({
            msg:'post liked'
        })

    }
    catch(error){
        return res.json({
            error:err.message
        })
    }
}
//dislike a post
module.exports.unlikePost = async function(req,res){
    try{
        //check if post id is valid

        //user can only dislike a post he has liked 
        //previously

        const userId = req.id;
        const postId = req.body.postid;

        await Like.destroy({
            where:{
                [Op.and]: [{ userid: userId }, { postid:postId }]    
            }
        })
        return res.json({
            msg:'post unliked'
        })

    }
    catch(error){
        return res.json({
            error:err.message
        })
    }
}