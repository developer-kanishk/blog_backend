const express = require('express')
const router = express.Router()
const {signup, login, protectRoute} = require('../controller/authController')
const {getUserById} = require('../controller/userController')
const { createComment, updateComment, deleteComment,getCommentByPostId,getCommentById,getCommentByUser} = require('../controller/commentController')
const { likePost,unlikePost } = require('../controller/likeController')
const { createPost, deletePost, updatePost, getPost, filterPost } = require('../controller/postController')



// router.route('/')
// .get((req,res)=>{
//     res.send('hello india');
// })

router.route('/signup')
.post(signup)


router.route('/login')
.post(login)


router.use(protectRoute)
//user routes
router.route('/user')
.get(getUserById)
router.route('/user/comments')
.get(getCommentByUser)



//post routes
router.route('/posts/:id')
.get(getPost)
router.route('/posts')
.post(createPost)
router.route('/posts/:id')
.delete(deletePost)
router.route('/posts/:id')
.put(updatePost)
router.route('/posts')
.get(filterPost)

//get all comments for a post
router.route('/posts/comments/:id')
.get(getCommentByPostId)



//comment routes

//post
router.route('/comments')
.post(createComment)
router.route('/comments/:id')
.delete(deleteComment)
router.route('/comments/:id')
.put(updateComment)
//get
router.route('/comments/:id')
.get(getCommentById)

//like and unlike routes
//post
router.route('/like')
.post(likePost)
router.route('/unlike')
.post(unlikePost)


module.exports = router;



