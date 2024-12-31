import express from "express";
import { protectRoute } from "../middleware/userAuth.middleware.js";
import {addImage, removeImage, searchAllImages, listAllImages, listAllCollections, listCollectionItems, searchCollection, createCollection, deleteCollection} from '../controllers/imageController.js';

const imageRoute = express.Router();

imageRoute.get('/list', listAllImages);

imageRoute.post('/search', searchAllImages);

imageRoute.post('/create-collection', protectRoute, createCollection )

imageRoute.post('/delete-collection', protectRoute, deleteCollection )

imageRoute.get('/list-collection-items', protectRoute, listCollectionItems);

imageRoute.get('/list-collection', protectRoute, listAllCollections);

imageRoute.post('/search-collection', protectRoute, searchCollection);

imageRoute.post('/add', protectRoute, addImage);

imageRoute.post('/remove', protectRoute, removeImage);

export default imageRoute;