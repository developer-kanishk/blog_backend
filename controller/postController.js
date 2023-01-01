const Post = require('../models/postModel');
const { post } = require('../Router/apiRouter');
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://kanishk1550:WD1VQmYIGk5eHHHp2kjtNe4A9Zzhe71j@dpg-cekimcpa6gdkdn05l420-a.oregon-postgres.render.com/blog_web_database',{
    "ssl": true,
    "dialectOptions": {
       "ssl": {
          "require": true
       }
     }
}) 
//create post

module.exports.createPost = async function createPost(req, res) {
    try {
        const data = req.body;
        const title = data.title;
        const content = data.content;
        const author = req.id;
        const category = data.category;
        const keywords = data.keywords;
        //keywords will be an array

        const post = await Post.build({
            title: title,
            content: content,
            author: author,
            category: category,
            keywords: keywords,
            created_at: Date.now()
        })

        const savedPost = await post.save();

        // console.log(savedPost.dataValues['id'])

        res.json({
            msg: 'post saved',
            postid:savedPost.dataValues['id']
        })


    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}
//delete post
module.exports.deletePost = async function deletePost(req, res) {
    try {
        //A user can delete only his post
        //add that check later
        const postId = req.params.id;
        //post id invalid
        
        const isPost = await Post.findOne({where:{
            id:postId
        }})
        if(isPost==null){
            return res.json({
                msg:'post does not exist'
            })
        }




        const post = await Post.findOne({ where: { id: postId } })
        // console.log(post)
        if (post) {
            await Post.destroy({
                where: {
                    id: postId
                }
            })
            return res.json({
                msg: 'post deleted'
            })
        }
        return res.json({
            msg: 'invalid postid'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

//update post
module.exports.updatePost = async function updatePost(req, res) {
    try {
        //if post doesnot exist

        //user can update only his post
        const updatedPost = req.body;
        console.log(updatedPost)

        const id = req.params.id;

        await Post.update(updatedPost, {
            where: {
                id: id
            }
        })

        res.json({
            msg: 'post updated'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

//get post by id
module.exports.getPost = async function getPost(req, res) {
    try {
        const postId = req.params.id
        //check if post id is valid

        const post = await Post.findOne({
            where: {
                id: postId
            }
        })

        res.json({
            msg: 'post found', post
        })


    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

//get posts based on filters

module.exports.filterPost = async function filterPost(req, res) {
    try {
        console.log(req.query)
        const keys = Object.keys(req.query);
        const filters = {}
        var orderFlag = 0;
        console.log(keys)
        keys.forEach(element => {
            if (element == 'order') {
                orderFlag = 1;
            }
            else {
                filters[element] = req.query[element]
            }
        });
        const nPosts = await Post.findAll({
            where: filters,
            order: [['created_at']]
        })
        const posts = []
        nPosts.forEach(element => {
            // console.log(element.dataValues)
            posts.push(element.dataValues)
        });
        // console.log(posts)

        if (orderFlag) {
            const order = req.query['order'];
            //most recent
            //most liked
            //most commented
            if (order == 'timestamp') {
                return res.json({ posts })
            }
            else if (order == 'likes') {
                var lcnt = []
                async function likeCounter() {
                    for (var i = 0; i < posts.length; i++) {
                        posts[i]['like_count'] = 0;
                        const [lc1, md1] = await sequelize.query(
                            "Select * from likes where postid=" + posts[i]['id']
                        )
                        lcnt.push(lc1.length);
                    }
                }
                likeCounter()
                    .then(() => {
                        console.log(lcnt)
                        for (var i = 0; i < posts.length; i++) {
                            posts[i]['like_count'] = lcnt[i];
                        }
                        function compare(a, b) {
                            return a['like_count'] - b['like_count'];
                        }
                        posts.sort(compare)
                        return res.json({
                            msg: 'sorted on likes',
                            posts
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            error: err.message
                        })
                    })

            } else if (order == 'comments') {
                var ccnt = []
                async function commentCounter() {
                    for (var i = 0; i < posts.length; i++) {
                        posts[i]['comment_count'] = 0;
                        const [lc1, md1] = await sequelize.query(
                            "Select * from comments where postid=" + posts[i]['id']
                        )
                        ccnt.push(lc1.length);
                    }
                }
                commentCounter()
                    .then(() => {
                        console.log(ccnt)
                        for (var i = 0; i < posts.length; i++) {
                            posts[i]['comment_count'] = ccnt[i];
                        }
                        function compare(a, b) {
                            return a['comment_count'] - b['comment_count'];
                        }
                        posts.sort(compare)
                        return res.json({
                            msg: 'sorted on comments',
                            posts
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            error: err.message
                        })
                    })
            } else {
                return res.json({
                    msg: 'invalid ordering'
                })
            }
        }else{
            return res.json({
                posts
            })
        }

    }
    catch (error) {
        return res.json({
            error: error.message
        })
    }
}





