import React, { useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { useImageStore } from '../store/useImageStore';

const ProfilePage = () => {
    const {authUser, isLoggingOut, logout} = useUserStore();
    const {userCollections, getUserCollections} = useImageStore();

    const handleSubmit =  () => {
        logout();
    };

    useEffect(()=>{
        getUserCollections()
    },[])

    return (
        <div className='flex items-center justify-center h-[85vh]'>
            <div className='flex items-center gap-4 p-2 shadow rounded'>
                <img className='w-[200px] h-[200px] rounded' src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp' alt="Profie picture" />
                <div className='flex flex-col gap-3 h-full'>
                    <p className='font-semibold text-lg'>{authUser.fullName}</p>
                    <p className='font-light'>Active since: 2nd April, 2024</p>
                    <div className='flex flex-col gap-2 bg-gray-200 rounded p-2'>
                        <p className='font-light'>Total Collections: <span className='font-semibold'>{userCollections.length}</span></p>
                        <p className='font-light'>Total Images: <span className='font-semibold'>{userCollections.flatMap(collection => collection.items).length}</span> </p>
                    </div>
                    <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className={`text-white ${isLoggingOut? 'bg-white' : 'bg-gray-400'} h-10 w-full  rounded transition-all`} 
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? (
                            <>
                            <span class="animate-ping inline-flex h-3 w-3 mr-3 rounded-full bg-gray-500 opacity-75"></span>
                            </>
                        ) : (
                            "Logout"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;