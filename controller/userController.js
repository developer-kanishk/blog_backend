const User = require('../models/userModel')
module.exports.getUserById = async function(req,res){
   try{
        const user = await User.findOne({
            where:{
                id:req.id
            }
        })
        return res.json({
            msg:'userfound',
            user
        })
   }
   catch(error){
    return res.json({
        error:error.message
    })
   }
}