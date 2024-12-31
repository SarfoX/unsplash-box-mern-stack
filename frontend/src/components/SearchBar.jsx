import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/useImageStore';

const SearchBar = ({searchQuery, fixedSize}) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState(searchQuery);
    const {searchLoading, setSearchLoading, search} = useImageStore();

    const handleSearch = () => {
        if (query) {
            navigate('/search/'+query)
            setSearchLoading(true);
            search(query);
        } else {
            search(query);
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.key==='Enter') {
            handleSearch()
        }
        
    }

    const handleSearchClose = () => {
        setSearchLoading(false);
        setQuery('');
    }

    return (
        <div className={`inline-flex items-center justify-between ${ fixedSize? 'w-[60vw]' : 'w-[90vw] md:w-[75vw] lg:w-[60vw]'} px-5 py-3 bg-white border-2 rounded-lg shadow transition-all`}>
            <input 
                onChange={(e)=>setQuery(e.target.value)} value={query} 
                onKeyDown={handleOnKeyDown}
                className='bg-inherit outline-none w-full ' 
                type="text" 
                placeholder='Enter your keywords...' 
            />
            
            {
                (!searchLoading && query) && 
                    <img onClick={handleSearchClose} className='mr-3 h-3 text-gray-500 cursor-pointer' src={assets.close} alt="" />
            }
            {
                (searchLoading && query) && 
                    <span class="animate-ping inline-flex h-3 w-3 mr-3 rounded-full bg-gray-500 opacity-75"></span>

            }
            <img onClick={handleSearch} className='ml-3 cursor-pointer' src={assets.search} alt="" />
        </div>
    )
}

export default SearchBar