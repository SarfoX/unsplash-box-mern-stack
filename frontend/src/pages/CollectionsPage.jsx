import React, { useEffect } from 'react'
import AddCollectionBar from '../components/AddCollectionBar';
import { useImageStore } from '../store/useImageStore';
import CollectionGalleryCard from '../components/CollectionGalleryCard';
import { useUserStore } from '../store/useUserStore';
import { Link } from 'react-router-dom';

const CollectionsPage = () => {
    const {authUser} = useUserStore();
    const {getUserCollections, userCollections} = useImageStore();
    
    useEffect(()=>{
        getUserCollections();
    },[])

    return (
        <>
            {
            !authUser?
            <div className='flex flex-col items-center justify-center h-[88vh] gap-5 mt-6'>
                <p className='font-md text-xl'>
                    <Link to={'/register'}><span className='font-light text-gray-500 hover:underline transition-all'>Register</span></Link> {' '}
                    or {' '}
                    <Link to={'/login'}><span className='font-light text-gray-500 hover:underline transition-all'>Sign In</span></Link> {' '}
                    to create & manage collections
                </p>
            </div>:

            <div className='flex flex-col items-center justify-center gap-5 mt-6'>
                <p className='gradient-text font-semibold text-4xl'>Collections</p>
                <div className='font-light text-md'>
                    <p>Explore the world through collections of beautiful</p> 
                    <p>photos free to use under the <span className='font-semibold underline'>Unsplash License</span>. </p> 
                </div>
                <AddCollectionBar />
                
                    {   
                        userCollections &&
                        <div key={Math.random()} className='grid gridcol2 grid-cols-4 grid-flow-row-dense gap-4 w-full mt-4 px-5 md:px-20'>
                            {userCollections.map((collection) => (
                                <CollectionGalleryCard id={collection.collectionName} collection={collection} />
                            ))}
                        </div>
                    }
            </div>}
        </>
        
    )
}

export default CollectionsPage;