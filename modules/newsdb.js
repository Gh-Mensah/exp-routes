const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//create news Schema and model
const newsSchema = new Schema({
    title:{
        type:String,
        required:[true,"Name field is required"]
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    }
})


const News = mongoose.model('news',newsSchema)


module.exports= News