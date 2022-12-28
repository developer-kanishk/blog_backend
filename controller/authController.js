
//signup the user
//protect route
//sign in 
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//temporary private key
const secret_key = 'afdjaslkjfuiawernarjfadsf';





module.exports.signup = async function signgup(req, res) {
    try {
        const userName = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        // console.log(userName,password)

        //if username is empty or password is empty
        if(userName.length==0 || password.length==0){
            return res.json({
                msg:'fields are empty'
            })
        }


        //username should not be repeated

        const findUser = await User.findOne({where:{username:userName}});
        console.log(findUser)

        if(findUser){
            return res.json({
                msg:'username already registered'
            })
        }
        //password and cnfm password should be same
        // console.log(3)

        if(password!=confirmPassword){
            return res.json({
                msg:'password and confirm password do not match'
            })
        }

        //further checks
        //validate checks on pass 
        //min lenght : 8
        //should contain alpha , numeric etc.


        const user = User.build({
            'username': userName,
            'password': password
        })

        await user.save()

        res.json({
            msg: 'user registered'
        })
    }
    catch (error) {
        res.json({
            error: error.message
        })
    }
}

module.exports.login = async function login(req, res) {
    try {

        const username = req.body.username;
        const password = req.body.password;

        //should not be empty

        //check for user in table
        //findall always returns an array
        const user = await User.findAll({
            where: {
                username: username
            }
        })

        // console.log(user)

        //check for user in table

        if (user.length == 0) {
            return res.json({
                msg: 'user not registered'
            })
        }

        const userdata = user[0].dataValues;
        const user_password = userdata.password;

        //check for password

        if (password != user_password) {
            return res.json({
                msg: 'password incorrect'
            })
        }

        //create the jwt token

        const token = jwt.sign({ username: username, id: userdata.id }, secret_key);

        //token should be created then only it should be set 

        //send the jwt in response
        //setting cookie
        res.cookie('isLoggedIn', token, { maxAge: 900000, httpOnly: true })

        return res.json({
            jwt: token
        })

    }
    catch {
        (err) => {
            return res.json({
                error: err.message
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    //check if cookie is received

    // console.log(req.cookies)
    if (req.cookies.isLoggedIn) {
        //verify the jwt token
        const token = req.cookies.isLoggedIn;
        const data = jwt.verify(token,secret_key);
        // console.log(data);
        //set the request params
        req.username = data.username;
        req.id = data.id;
        //call the next fn
        next()
    }
    else {
        return res.json({
            msg: "please login"
        })
    }

}