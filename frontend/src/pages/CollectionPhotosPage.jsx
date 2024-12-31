import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery';
import { useImageStore } from '../store/useImageStore';

const CollectionPhotosPage = () => {
    const {collectionName} = useParams();

    const {getUserCollections, userCollections} = useImageStore();

    useEffect(()=>{
            getUserCollections();
    },[])
    
    const collection = userCollections.filter((collection)=>collection.collectionName===collectionName)[0];
    
    return (
        <div className='flex flex-col items-center justify-center gap-4 mt-6 w-full px-5 md:px-10'>
            <p className='gradient-text font-semibold text-4xl'>{collection.collectionName}</p>
            <p className='font-light text-md'>{collection.items.length} photos</p> 
            <ImageGallery result={collection.items}/>
        </div>
    )
}

export default CollectionPhotosPage