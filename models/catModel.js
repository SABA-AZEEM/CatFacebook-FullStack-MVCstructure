import mongoose from 'mongoose';

const catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    favoriteFood:String,
    funFact:String,
    image:String,
});

export default mongoose.model('Cat',catSchema);