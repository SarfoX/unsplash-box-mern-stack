import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Image from '../models/image.model.js';
import User from '../models/user.model.js';
import Collection from '../models/collection.model.js';

dotenv.config();

const photosUrl = 'https://api.unsplash.com/photos/?client_id=' + process.env.UNSPLASH_ACCESS_KEY;
const searchUrl = 'https://api.unsplash.com/search/photos/?client_id=' + process.env.UNSPLASH_ACCESS_KEY;

const listAllImages = async (req, res) => {
    try {
        let imageList = [];

        const response = await fetch(photosUrl);

        if(response.status==200){
            const jsonData = await response.json();
            jsonData.map((data)=>{
                imageList = [...imageList,{
                    imageId: data.id,
                    slug: data.slug,
                    altDescription: data.alt_description,
                    description: data.description,
                    urlRaw: data.urls.raw,
                    urlThumb: data.urls.thumb,
                    urlDownload: data.links.download,
                    authorName: data.user.name,
                    authorPicUrl: data.user.profile_image.small,
                    publishDate: data.created_at,
                    collectionName: '',
                }]
            })
            
            res.status(200).json({
                message: "Images retrieved from external url", 
                payload: imageList, 
                payloadSize: imageList.length
            })
        }
        else {
            res.status(201).json({message: "Could not retrieve images from external url"})
        }
        
        
    } catch (error) {
        console.log("Error in listAllImages controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}

const searchAllImages = async (req, res) => {
    try {
        const {query} = req.body;

        if (!query) { 
            res.status(201).json({
            message: 'Search Field is Empty'
            })
            return
        }
        
        let imageList = [];

        const response = await fetch(searchUrl + '&query=' + query + '&per_page=28' + '&page=1');

        if(response.status==200){
            const jsonData = await response.json();
            
            jsonData.results.map((data)=>{
                imageList = [...imageList,{
                    imageId: data.id,
                    slug: data.slug,
                    altDescription: data.alt_description,
                    description: data.description,
                    urlRaw: data.urls.raw,
                    urlThumb: data.urls.thumb,
                    urlDownload: data.links.download,
                    authorName: data.user.name,
                    authorPicUrl: data.user.profile_image.small,
                    publishDate: data.created_at,
                    collectionName: '',
                }]
            })
            
            res.status(200).json({
                message: "Search retrieved from external url", 
                payload: imageList, 
                payloadSize: imageList.length
            })
        }
        else {
            res.status(201).json({message: "Could not retrieve images from external url"})
        }
        
    } catch (error) {
        console.log("Error in searchAllImages controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const createCollection = async (req, res) => {
    try {
        const userId = req.user._id;
        const {collectionName} = req.body;

        
        const similarCollection = await Collection.findOne({collectionName});
        if (similarCollection) return res.status(400).json({
            message: "Collection Already Exist",
            payload: {
                collectionName: similarCollection.collectionName,
                items: similarCollection.items,
            }
        })

        if (collectionName) {
            const newCollection = new Collection({
                userId,
                collectionName,
                items: [],
            });

            await newCollection.save();

            res.status(200).json({
                message: "Collection Created",
                payload: {
                    collectionName: newCollection.collectionName,
                    items: newCollection.items,
                }
            })

        } else {
            res.status(201).json({message: "Specify Collection Name"})
        }
    } catch (error) {
        console.log("Error in createCollection controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const deleteCollection = async (req, res) => {
    try {
        const {collectionName} = req.body;
        const userId = req.user._id;

        if (collectionName) {
            await Collection.findOneAndDelete({collectionName});
            const newCollection = await Collection.find({userId},'-userId');
            res.status(200).json({
                message: "Collection Removed",
                payload: newCollection
            })

        } else {
            res.status(201).json({message: "Specify Collection Name"})
        }
    } catch (error) {
        console.log("Error in removeCollection controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const listAllCollections = async (req, res) => {
    try {
        const userId = req.user._id;
        const collections = await Collection.find({userId},'-userId');
        
        res.status(200).json({
            message: "Collections Retrieved",
            payload: collections
        })
    } catch (error) {
        console.log("Error in listCollections controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const listCollectionItems = async (req, res) => {
    try {
        const {collectionName} = req.body;
        const items = await Collection.findOne({collectionName},'items');
        res.status(200).json({
            message: "Collection Images Retrieved",
            payload: {items}
        })
    } catch (error) {
        console.log("Error in listCollectionItems controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const searchCollection = async (req, res) => {
    const {query} = req.body;
    const userId = req.user._id;
}

const addImage = async (req, res) => {
    try {
        const {item, collectionName} = req.body;
        const imageId = item.imageId;
        const userId = req.user._id;

        // Set default image as already in collection.
        let imgExistAlready = true;
        let collection = await Collection.findOne({collectionName},'-userId');
        const similarItem = collection.items.filter((item) => item.imageId===imageId)[0];

        if (!similarItem) {
            await Collection.updateOne({collectionName},{items:[...collection.items, item]});
            imgExistAlready = false;
        }
        
        const newCollection = await Collection.find({userId},'-userId');
        
        res.status(200).json({
            message: !imgExistAlready ? 
                        'Image Succesfully Added to ' + collectionName: 
                        'Image Already Exist in ' + collectionName,
            payload: newCollection,
        })
        
    } catch (error) {
        console.log("Error in addImage controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const removeImage = async (req, res) => {
    try {
        const {item, collectionName} = req.body;
        const imageId = item.imageId;
        const userId = req.user._id;

        const collection = await Collection.findOne({collectionName});
        let items = collection.items
        
        const purgedItems = items.filter((item) => item.imageId!==imageId);

        await Collection.findOneAndUpdate({collectionName},{items: purgedItems});

        const newCollection = await Collection.find({userId},'-userId');

        res.status(200).json({
            message: 'Image Removed From '+ collectionName,
            payload: newCollection
        })

    } catch (error) {
        console.log("Error in removeCollection controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export {addImage, removeImage, searchAllImages, listAllImages, createCollection, deleteCollection, listAllCollections, listCollectionItems, searchCollection}