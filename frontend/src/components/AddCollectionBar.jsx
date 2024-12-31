import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { useImageStore } from '../store/useImageStore';

const AddCollectionBar = () => {
    
    const [collectionName, setCollectionName] = useState('');
    const {addCollectionLoading, createCollection} = useImageStore();

    const handleAdd = () => {
        createCollection(collectionName);
    }

    const handleKeyDown = (e) => {
        if(e.key==='Enter') handleAdd()
    }

    return (
        <div className={`inline-flex items-center justify-between w-[90vw] md:w-[75vw] lg:w-[60vw] px-5 py-3 bg-white border-2 rounded-full shadow transition-all`}>
            <input onKeyDown={handleKeyDown} onChange={(e)=>setCollectionName(e.target.value)} value={collectionName} className='bg-inherit outline-none w-full ' type="text" placeholder='New Collection' />
            {
                (addCollectionLoading && collectionName) && 
                    <span class="animate-ping inline-flex h-3 w-3 mr-3 rounded-full bg-gray-500 opacity-75"></span>

            }
            <img onClick={handleAdd} className='ml-3 border-2 border-gray-300 rounded-full cursor-pointer' src={assets.plus} alt="" />
        </div>
    )
}

export default AddCollectionBar