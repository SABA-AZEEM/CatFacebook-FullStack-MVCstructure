import express from 'express';
import catController from '../controllers/catController.js';
import { upload } from '../controllers/catController.js';
const router=express.Router();

router
    .route('/')
    .get(catController.getAllCats);

router
    .route('/upload')
    .get(catController.uploadPage)
    //It handles the uploaded file and makes it available in the request object as req.file.
    .post(upload.single('image'),
    catController.createCat);

router
    .route('/edit/:id')
    .get(catController.editPage)
    .post(catController.updateCat);

router
    .route('/delete/:id')
    .post(catController.deleteCat);


export default router;