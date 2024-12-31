import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import SearchBar from '../components/SearchBar';
import { useImageStore } from '../store/useImageStore';
import ImageGallery from '../components/ImageGallery';

const SearchResultPage = () => {
    const {query} = useParams();
    const {searchResult} = useImageStore();
    
    return (
        <div className='flex flex-col items-center justify-center'>
            <img  src={assets.gradient_bg} alt="" />
            <div className='flex flex-col items-center justify-center w-full px-5 md:px-10'>
                
                <div className='absolute top-24'>
                    <SearchBar searchQuery={query} fixedSize={true}/>
                </div>
                
                <ImageGallery result={searchResult}/>
                
            </div>
        </div>
        
    )
}

export default SearchResultPage