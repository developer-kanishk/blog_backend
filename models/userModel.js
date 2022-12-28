const { Sequelize, Model, DataTypes } = require("sequelize");

//connnecting to db

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
    console.log('user_db connected')
})
.catch((err)=>{
    console.log('user_db',err)
})



const user = sequelize.define('user',{
    username : {
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING
    }},
    {
        timestamps:false
    }
)

async function syncTable(){
    await user.sync({ force: false });
}

syncTable()


module.exports = user










