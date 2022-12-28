const {Sequelize,DataTypes} = require('sequelize')
// const sequelize = new Sequelize('blog_db','postgres','123456',{
//     dialect:'postgres'
// })
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
    console.log('comment_db connected')
})
.catch((err)=>{
    console.log('comment_db',err)
})

const comment = sequelize.define('comment',{
    userid:{type:DataTypes.INTEGER},
    comment:{type:DataTypes.STRING(1234)},
    postid:{type:DataTypes.INTEGER}
},{
    timestamps:false
})

async function syncTable(){
    await comment.sync({
        alter:true
    })
}

syncTable()

module.exports = comment