const {Sequelize,DataTypes} = require('sequelize')
const { post } = require('../Router/apiRouter')
const sequelize = new Sequelize('postgres://kanishk1550:WD1VQmYIGk5eHHHp2kjtNe4A9Zzhe71j@dpg-cekimcpa6gdkdn05l420-a.oregon-postgres.render.com/blog_web_database',{
    "ssl": true,
    "dialectOptions": {
       "ssl": {
          "require": true
       }
     }
}) 
sequelize.authenticate()
.then(()=>{
    console.log('like_db connected')
})
.catch((err)=>{
    console.log('like_db',err)
})

const like = sequelize.define('like',{
    //post id
    //user id
    userid:{
        type:DataTypes.INTEGER
    },
    postid:{
        type:DataTypes.INTEGER
    }
},{
    timestamps:false
})

async function syncTable(){
    await like.sync({
        alter:true
    })
}
syncTable()

module.exports = like





