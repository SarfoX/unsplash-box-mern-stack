import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useImageStore } from '../store/useImageStore';
import { assets } from '../assets/assets.js';
import {saveAs}  from 'file-saver';

import Button from '../components/Button';
import AddCollectionPopUp from '../components/AddCollectionPopUp.jsx';
import CollectionListItem from '../components/CollectionListItem.jsx';
import { useUserStore } from '../store/useUserStore.js';

const ImageDetailsPage = () => {
    const [popUpActive, setPopUpActive] = useState(false);

    const {imageId} = useParams();
    const {removeImage, searchResult, getUserCollections, userCollections} = useImageStore();
    const {authUser} = useUserStore();

    const imageItem =   searchResult.filter(item => item.imageId===imageId)[0] ||
                        userCollections.flatMap(collection => collection.items).
                        filter(item => item.imageId===imageId)[0]
    
    let imageCollection = userCollections.filter(collection=>
                            collection.items.flatMap(item => item.imageId)
                            .includes(imageId)
                        );

    const togglePopUp = () => {
        setPopUpActive(!popUpActive);
    }

    const handleDownload = () => {
        imageItem && saveAs(imageItem.urlDownload, imageItem.slug+'.jpg');
    }
    
    const handleRemoveItem = (collectionName) => {
        removeImage(imageId, collectionName);
    }

    useEffect(()=>{
        getUserCollections();
    },[])

    useEffect(()=>{
        imageCollection = userCollections.filter(collection=>
                collection.items.flatMap(item => item.imageId)
                .includes(imageId)
            )
    }, [userCollections])

    return (
        <div>
            { !imageItem?
            <div className='flex items-center h-full justify-center gap-5 mt-5 pb-5 px-5 md:px-10'>
                <img className='w-[60%] h-[50%] rounded' 
                src={assets.no_image_found} 
                alt='No Image Found' />
            </div>:
            
            <>
                {/* Parent Component */}
                <div 
                    className={`flex items-start justify-center align-middle gap-5 mt-5 pb-5 px-5 md:px-10
                                ${popUpActive&&'opacity-25 pointer-events-none'}`}
                >
                    {/* Left Pane */}
                    <div className='flex-1'>
                        {
                            imageItem &&
                            <img src={imageItem.urlRaw} className='max-h-[90vh] w-full rounded' alt={imageItem.altDescription} />
                        }
                    </div>

                    {/* Right Pane */}
                    <div className='flex-1'>
                        {/* Image metadata */}
                        {
                            imageItem && 
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-5'>
                                    <img src={imageItem.authorPicUrl} className='w-10 rounded-full' alt="Author's profile picture" />
                                    <p className='font-medium'>{imageItem.authorName}</p>
                                </div>
                                <p className='text-sm font-light'>Published on: {imageItem.publishDate}</p>
                            </div> 
                        }

                        {/* Buttons */}
                        {
                            authUser &&
                            <div className='flex gap-5 mt-4'>
                                <Button name={'Add to Collection'} image={assets.plus} handleClick={togglePopUp}/>
                                <Button name={'Download'} image={assets.down_arrow} handleClick={handleDownload} />
                            </div>
                        }
                        

                        {/* Collection */}
                        {
                            authUser &&
                            <div className='mt-10'>
                                <p className='text-lg font-semibold'>Collections</p>
                                <div className='flex flex-col gap-3 mt-4'>

                                {
                                    imageCollection && 
                                    imageCollection.map((collection, i)=>(
                                        <CollectionListItem 
                                            id={i}
                                            collection={collection} 
                                            type={'remove'} 
                                            handleOnClick={()=>{handleRemoveItem(collection.collectionName)}} 
                                        />
                                    ))
                                }

                                </div>
                            </div>
                        }
                        

                    </div>
                </div>

                {/* Pop-up Component */}
                <AddCollectionPopUp 
                    popUpActive={popUpActive} 
                    togglePopUp={togglePopUp} 
                    imageId={imageId}
                    collections={userCollections} 
                />
            </>
            }
        </div>
    )
}

export default ImageDetailsPage