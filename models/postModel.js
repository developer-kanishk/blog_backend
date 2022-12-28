const {Sequelize,DataTypes} = require('sequelize')

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
    console.log('post_db connected')
})
.catch((err)=>{
    console.log('post_db',err)
})

//fields:
//post title
//post desc
//post author
//post  cat
//keywords
//created at

const post = sequelize.define('post',{
    title:{type:DataTypes.STRING},
    content:{type:DataTypes.STRING(1234)},
    author:{type:DataTypes.INTEGER},
    category:{type:DataTypes.STRING},
    keywords:{type:DataTypes.STRING},
    created_at:{type:DataTypes.DATE}
},{
    timestamps:false
})

async function syncTable(){
    await post.sync({ alter: true });
}

syncTable()




module.exports = post;








