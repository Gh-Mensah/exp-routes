const express = require('express')
const News = require('./modules/newsdb')
const router = express.Router()


//GET LIST OF NEWS
router.get('/news',(req,res,next)=>{
    News.aggregate( [ { $project : { title : 0 , description : 0 , available:0 , _id:1, __v:0}} , { $limit : 7} ] ).then((news)=>{
        //getting the last element in the array/object
        let lastElement = news[news.length - 1]

        //using the last element to paginate the remaining documents
        News.find({_id:{$gte:lastElement._id}}).limit(3).then((fnews)=>{
            res.send(fnews)
        })
     }).catch(next)
    
})

//POST NEW NEWS 
router.post('/news',(req,res,next)=>{
   News.create(req.body).then((news)=>{
       res.send(news)
    }).catch(next)
})


//UPDATE THE NEWS LIST 
router.put('/news/:id',(req,res,next)=>{
    News.updateOne({_id:req.params.id},{$set : {title : req.body.title}}).then(()=>{
        News.findOne({_id:req.params.id}).then((news)=>{
            res.send(news)
        }).catch(next)
    })
})


//DELETE  A NEWS IN THE NEWS LIST
router.delete('/news/:id',(req,res,next)=>{
    News.deleteOne({title:req.params.id}).then((news)=>{
        res.send(news)
    })
})

module.exports=router