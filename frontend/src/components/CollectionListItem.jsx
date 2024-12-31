import React, { useState } from 'react'
import { assets } from '../assets/assets';

const CollectionListItem = ({id, collection, type, handleOnClick}) => {
    const [hover, setHover] = useState(false);

    const handleMouseOver = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
    }
    
    return (
        <div 
            key={id}
            onMouseOver={handleMouseOver} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleOnClick}
            className='flex items-center justify-between rounded px-3 py-2 cursor-pointer hover:bg-gray-300'
        >
            <div className='flex items-center gap-2'>
                <img 
                    className='h-12 w-12 rounded' 
                    src={collection.items.length>0 ? 
                            collection.items[0].urlThumb : 
                            assets.no_image_found_alt
                        } 
                    alt="Cover Image" 
                />
                <div>
                    <p className='font-medium'>{collection.collectionName}</p>
                    <p className='text-sm font-light'>{collection.items.length} Photos</p>
                </div>
            </div>
            <div className={`flex gap-1 ${hover? 'block': 'hidden'}`}>
                <img src={type==='remove' ? assets.remove: assets.plus} alt="Remove image from collection" />
                <p className='text-sm'>{type==='remove' ? 'remove': 'add'}</p>
            </div>
        </div>
    )
}

export default CollectionListItem;