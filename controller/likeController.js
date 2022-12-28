//like a post
const { Op } = require("sequelize");

const Like = require('../models/likeModel');
const User = require("../models/userModel");
const Post = require('../models/postModel')
module.exports.likePost = async function likePost(req,res){
    try{
        //check if post id is valid
        const postId = req.body.postid
        const post = await Post.findOne({where:{
            id:postId
        }})
        if(post==null){
            return res.json({
                msg:'post does not exist'
            })
        }


        const isLiked = await Like.findOne({where:{
            postid:postId,
            userid:req.id
        }})
        if(isLiked!=null){
            return res.json({
                msg:'user has already liked the post'
            })
        }



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
            error:error.message
        })
    }
}
//dislike a post
module.exports.unlikePost = async function(req,res){
    try{
        //check if post id is valid
        const postId = req.body.postid
        const post = await Post.findOne({where:{
            id:postId
        }})
        if(post==null){
            return res.json({
                msg:'post does not exist'
            })
        }
        //user can only dislike a post he has liked 
        //previously

        const isLiked = await Like.findOne({where:{
            postid:postId,
            userid:req.id
        }})

        if(isLiked==null){
           //user has not liked the post
            return res.json({
                msg:'post already unliked'
            })
        }

        const userId = req.id;

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