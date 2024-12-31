import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import { assets } from '../assets/assets';

const HomePage = () => {
    return (
        <div className='flex items-center justify-between h-[88vh] gap-0.5'>
            {/* LEFT HERO */}
            <div className='w-[5vw] md:w-[12.5vw] lg:w-[20vw]'>
                <img className='relative h-max w-fit md:right-0 transition-all' src={assets.hero_left} alt="" />
            </div>

            {/* CENTRAL HERO */}
            <div className=' flex flex-col items-center gap-y-2'>
                <p className='text-4xl font-semibold'>Search</p>
                <p className='text-sm sm:text-lg font-light text-center transition-all'>Search high-resolution images from Unsplash</p>
                
                <SearchBar searchQuery={''} fixedSize={false} />
            </div>

            {/* RIGHT HERO */}
            <div className='w-[5vw] md:w-[12.5vw] lg:w-[20vw]'>
                <img className='relative  h-max w-fit  transition-all' src={assets.hero_right} alt="" />
            </div>
        </div>
    )
}

export default HomePage;