//om
const PORT = 8080;
const express = require('express');
const cookieParser = require('cookie-parser')
const { Sequelize } = require('sequelize');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



const apiRouter = require('./Router/apiRouter')






app.use('/api',apiRouter)




app.listen(PORT,()=>{
    console.log('app started on ', PORT)
})