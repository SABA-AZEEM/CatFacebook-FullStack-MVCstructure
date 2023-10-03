import Cat from '../models/catModel.js';
import multer from 'multer';
// multer config for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
export  const upload = multer({ storage: storage });

const obj={
    getAllCats:async(req,res)=>{
        try{
            const cats=await Cat.find();
            res.render('home.ejs',{
                cats:cats,
            });
        }catch(error){
            console.log(error);
        }
    },

    uploadPage:async(req,res)=>{
        res.render('upload');
    },

    createCat:async(req,res)=>{
        try{
            const cat=new Cat({
               name:req.body.name,
               age:req.body.age,
               favoriteFood:req.body.favoriteFood,
               funFact:req.body.funFact,
               image:req.file.filename,//multer places the file info into req.file
            });
            await cat.save();
            res.redirect('/');
        }catch(error){
            console.log(error);
        }
    },

    editPage:async(req,res)=>{
        try{
            const cat=await Cat.findById(req.params.id);
            res.render('edit.ejs',{
                cat:cat,
            })
        }catch(error){
            console.log(error);
        }
    },

    updateCat:async(req,res)=>{
        try{
            await Cat.findByIdAndUpdate(req.params.id,req.body);
            console.log(req.body.name);
            res.redirect('/');
        }catch(error){
            console.error(error);
            res.status(500).send("Server side error");
        }
    },

    deleteCat:async(req,res)=>{
        try{
            await Cat.findByIdAndDelete(req.params.id);
            res.redirect('/');
        }catch(error){
            console.log(error);
        }
    }
}

export default obj;
