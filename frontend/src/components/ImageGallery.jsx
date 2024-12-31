import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/useImageStore';

const ImageGallery = ({result}) => {
    const navigate = useNavigate();

    const [resultChunk, setResultChunk] = useState([[]]);
    const {searchResult} = useImageStore();

    const adjustTile = () => {
        let screen = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let colPerScreen = 4; // 4 col for large devices

        if ( screen < 640 ) {
            colPerScreen = 2; // 2 col for small devices
        } else if (screen >= 640 && screen < 768) {
            colPerScreen = 3; // 3 col for medium devices
        } 

        let chunk = _.chunk(result, Math.ceil(result.length/colPerScreen));
        const minOptLength = Math.floor(result.length/colPerScreen);
        const numMaxChunks = result.length - chunk.length * minOptLength;

        chunk.map((_, i)=> {
            if (i<(chunk.length-1)) {

                if (numMaxChunks-i > 0) {
                    chunk[i+1].push( ...chunk[i].splice(minOptLength + 1) );
                } else {
                    chunk[i+1].push( ...chunk[i].splice(minOptLength) );
                }

            }
        })

        setResultChunk(chunk)
    };

    window.onresize = adjustTile;

    useEffect(()=>{
        adjustTile();
    },[searchResult]);

    const handleOnClick = (e, imageId) => {
        navigate('/image/'+imageId);
    }

    return (
        <div className='flex items-start justify-center w-full gap-x-3 mt-6'>
            {   result &&
                resultChunk.map((subChunk, i)=>(
                    <div key={i} className='flex flex-col w-full items-center gap-y-3'>
                        {
                        subChunk.map((item) =>(
                            <img 
                                key={item.imageId} 
                                className={`${result.length <= 2 ? 'max-w-[380px]': 'w-full'} min-h-[200px] max-h-[250px] rounded-lg cursor-pointer shadow-sm hover:scale-[1.025] hover:shadow hover:shadow-gray-300 active:opacity-95 transition-all`}
                                src={item.urlThumb} alt={item.altDescription} 
                                onClick={(e) => handleOnClick(e, item.imageId)}
                            />
                        ))
                        }
                    </div>
                    
                ))
            }
        </div>
    )
}

export default ImageGallery;