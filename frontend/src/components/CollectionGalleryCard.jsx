import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/useImageStore';

const CollectionGalleryCard = ({id, collection}) => {
    const [showRemove, setShowRemove] = useState(false);
    const {deleteCollection} = useImageStore();

    const navigate = useNavigate();

    const numImages = collection.items.length;
    
    const handleClick = (e) => {
        if (e.target.innerHTML!=='Remove') {
            navigate('/collection-photos/' + collection.collectionName);
        }
        
    }

    const handleHover = () => {

    }

    const handleRemove = (e) => {
        if (e.target.innerHTML==='Remove') {
            deleteCollection(collection.collectionName);
        }
    }

    return (
        <div key={id} className='flex flex-col items-center justify-between h-[250px]'>
            {
                <div 
                    onClick={handleClick} 
                    onMouseOver={()=>setShowRemove(true)} 
                    onMouseOut={()=>setShowRemove(false)}
                    className='flex items-center justify-center w-full rounded hover:scale-[1.025] hover:shadow hover:shadow-gray-300 active:opacity-90 transition-all cursor-pointer'
                >
                    {
                        numImages === 1 && 
                        <img className='w-full h-[200px] rounded' src={collection.items[0].urlThumb} alt={collection.items[0].altDescription} />
                        
                    }
                    {
                        numImages === 2 && 
                        <div className='grid grid-cols-2 gap-0.5 w-full h-full '>
                            <img className='w-full h-[200px] rounded-l' src={collection.items[0].urlThumb} alt={collection.items[0].altDescription} />
                            <img className='w-full h-[200px] rounded-r' src={collection.items[1].urlThumb} alt={collection.items[1].altDescription} />
                        </div>
                    }
                    {
                        numImages > 2 && 
                        <div className='grid grid-cols-4 grid-rows-2 gap-0.5 w-full h-[200px]'>
                            <img className='col-span-3 row-span-2 w-full h-full rounded-l' src={collection.items[0].urlThumb} alt={collection.items[0].altDescription} />
                            <img className='w-full h-full rounded-tr' src={collection.items[1].urlThumb} alt={collection.items[1].altDescription} />
                            <img className='w-full h-full rounded-br' src={collection.items[2].urlThumb} alt={collection.items[2].altDescription} />
                        </div>
                    }
                    {
                        numImages === 0  &&
                        <img className='w-full h-[200px] rounded' src={assets.no_image_found} alt="No Image Found" />
                    }
                    {
                        <button 
                            type='submit'
                            onClick={handleRemove} 
                            className={`absolute top-2 right-2 py-1 px-3 rounded-full bg-gray-100 opacity-80 transition-all ${showRemove?'':'hidden'}`}
                        >
                            <p className='text-sm font-light'>Remove</p>
                        </button>
                    }
                </div>
            }
            

            <div className='flex flex-col items-start mt-2 w-full'>
                <p className='font-semibold text-sm'>{collection.collectionName}</p>
                <p className='font-light text-sm text-gray-400'>{collection.items.length} photos</p>
            </div>
        </div>
    )
}

export default CollectionGalleryCard