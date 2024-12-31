import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import CollectionListItem from './CollectionListItem.jsx';
import { useImageStore } from '../store/useImageStore.js';


const AddCollectionPopUp = ({popUpActive, togglePopUp, imageId, collections}) => {
    const [searchCollection, setSearchCollection] = useState('');

    const {addImage} = useImageStore();

    const handleOnClick = (collectionName) => {
        addImage(imageId, collectionName);
    }

    return (
        <div 
            className={` overflow-auto fixed left-[25%] top-[10%] shadow rounded-sm bg-white w-[50%] h-[80%] space-y-4 p-5 justify-start
            ${popUpActive?'':'hidden'}`}
        >

            <div className='flex items-center justify-between'>
            <p className='text-xl font-semibold'>Add to Collections</p>
                <img onClick={togglePopUp} className='w-3 h-3 cursor-pointer' src={assets.close} alt="" />
            </div>
        
            <div className="flex justify-between h-12 border-2 rounded shadow bg-white w-full pr-4 gap-4">
                <input
                type='text'
                className= 'w-full pl-10 outline-none'
                placeholder="Enter your password"
                value={searchCollection}
                onChange={(e) => setSearchCollection(e.target.value)}
                />
                <img className="w-5 rounded-full cursor-pointer" 
                src={assets.search} 
                alt="Search collection" />
            </div>
        
            {
                collections && 
                collections.map((collection, i)=>(
                    <CollectionListItem 
                        id={i}
                        collection={collection} 
                        type={'add'} 
                        handleOnClick={()=>handleOnClick(collection.collectionName)} 
                    />
                ))
            }
            
        </div>
    )
}

export default AddCollectionPopUp;


