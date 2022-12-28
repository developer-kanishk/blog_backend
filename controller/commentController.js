const Comment = require('../models/commentModel')
//post a comment
//update a comment
//delete a comment

//create comment
module.exports.createComment = async function createComment(req,res){
    try{
        //check for empty invalid
        //fields

        //see if post id valid
        const data = {
            userid : req.id,
            postid : req.body.postid,
            comment: req.body.comment
        }
        const comment = await Comment.build(data)

        await comment.save()

        res.json({
            msg:'comment saved'
        })


    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}
//delete comment
module.exports.deleteComment = async function deleteComment(req, res) {
    try {
        //A user can delete only his comment
        //add that check later
        const commentId = req.params.id;
        const comment = await Comment.findOne({ where: { id: commentId } })
        // console.log(post)
        if (comment) {
            await Comment.destroy({
                where: {
                    id: commentId
                }
            })
            return res.json({
                msg: 'comment deleted'
            })
        }
        return res.json({
            msg: 'invalid commentid'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}
//update comment
module.exports.updateComment = async function updateComment(req, res) {
    try {
        //if comment doesnot exist

        //user can update only his comment
        const updatedComment = req.body;
        // console.log(updatedComment)

        const id = req.params.id;

        await Comment.update(updatedComment, {
            where: {
                id: id
            }
        })

        res.json({
            msg: 'comment updated'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

//get comment by id
module.exports.getCommentById = async function getCommentById(req,res){
    try{
        const id = req.params.id;
        const comment = await Comment.findOne({where:{
            id:id
        }})
        if(comment){
            return res.json({
                msg:'comment found',comment
            })
        }
        return res.json({
            msg: 'invalid commentid'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

//get all comments for a post
module.exports.getCommentByPostId = async function getCommentByPostId(req,res){
    try{
        const id = req.params.id;
        const comments = await Comment.findAll({where:{
            postid:id
        }})
        if(comments.length>0){
            return res.json({
                msg:'comments found',comments
            })
        }
        return res.json({
            msg: 'no comments found'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

//get all comments for a user
module.exports.getCommentByUser = async function(req,res){
    try{
        const comments = await Comment.findAll({
            where:{
                'userid':req.id
            }
        })
        if(comments.length){
            return res.json({
                msg:'comments found',comments
            })
        }   
        else{
            return res.json({
                msg:'no comments found'
            })
        }
    }
    catch(error){
        return res.json({
            error:error.message
        })
    }
}