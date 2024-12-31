import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {Toaster} from "react-hot-toast";

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CollectionPhotosPage from './pages/CollectionPhotosPage';
import CollectionsPage from './pages/CollectionsPage';
import ImageDetailsPage from './pages/ImageDetailsPage';
import SearchResultPage from './pages/SearchResultPage';
import ProfilePage from './pages/ProfilePage';

import {useUserStore} from './store/useUserStore.js';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const {authUser, checkAuth} = useUserStore();
  const location = useLocation();

  useEffect(() => {
      checkAuth();
  }, [location.key]);

  return (
    <div className='bg-white'>
      <Navbar />
      
      <Routes>
        <Route path='/' element={ <HomePage/> }/>
        <Route path='/login' element={!authUser? <LoginPage/>: <Navigate to='/' /> }/>
        <Route path='/register' element={!authUser? <RegisterPage/>: <Navigate to='/' /> } />
        <Route path='/search/:query' element={<SearchResultPage/>}/>
        <Route path='/image/:imageId' element={<ImageDetailsPage/>}/>
        <Route path='/collection' element={<CollectionsPage/>}/>
        <Route path='/collection-photos/:collectionName' element={authUser? <CollectionPhotosPage/>: <Navigate to='/login' /> }/>
        <Route path='/profile' element={authUser? <ProfilePage/>:<Navigate to='/' />}/>
      </Routes>

      <Toaster />
      
    </div>
  )
}

export default App;