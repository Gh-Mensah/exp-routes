const express = require('express')
const app= express();
const routes= require('./apiRoutes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


app.use(bodyParser.json())

//connect to mongodb

mongoose.connect("mongodb://localhost/newspapers")
mongoose.Promise=global.Promise





//intialize routes
app.use('/api',routes)


//Error handling 

app.use((err,req,res,next)=>{
    res.status(422).send(err._message)
})


app.listen(3007,()=>{
    console.log("Node Server successfully running");
})
