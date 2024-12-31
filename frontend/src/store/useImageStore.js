import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useUserStore } from './useUserStore.js';


export const useImageStore = create((set, get)=>({
    
    searchLoading: false,
    searchResult: [],
    addCollectionLoading: false,
    userCollections: [],
    
    updateAuthUser: () => useUserStore.getState().authUser,

    setSearchLoading: (state) => {
        set({searchLoading: state});
    },

    search: async (query)=>{
        try {
            const response = await axiosInstance.post('/images/search', {query});

            if (response.status==200) {
                set({searchResult: response.data.payload})
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({searchLoading: false});
        }
        
    },

    createCollection: async (collectionName) => {
        set({addCollectionLoading: true})
        try {
            const {updateAuthUser, userCollections} = get()
            const authUser = updateAuthUser();
            
            if (authUser) {
                    const response = await axiosInstance.post('/images/create-collection', {collectionName});
                    
                    if (response.status==200) {
                        set({userCollections: [...userCollections,response.data.payload]});
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
            } else {
                toast.error('User not authenticated');
            }

        } catch (error) {
            console.log(error);
        } finally {
            set({addCollectionLoading: false})
        }
    },

    deleteCollection: async (collectionName) => {
        try {
            const {updateAuthUser} = get()
            const authUser = updateAuthUser();
            
            if (authUser) {
                    const response = await axiosInstance.post('/images/delete-collection', {collectionName});
                    
                    if (response.status==200) {
                        set({userCollections: response.data.payload});
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
            } else {
                toast.error('User not authenticated');
            }

        } catch (error) {
            console.log(error);
        }
    },

    getUserCollections: async () => {
        try {
            const {updateAuthUser} = get()
            const authUser = updateAuthUser();
            
            if (authUser) {
                    const response = await axiosInstance.get('/images/list-collection');
                    if (response.status==200) {
                        set({userCollections: response.data.payload});
                        // toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
            } else {
                toast.error('User not authenticated');
            }
        } catch (error) {
            console.log(error);
        }
    },

    addImage: async (imageId, collectionName) => {
        try {
            const {updateAuthUser, searchResult, userCollections} = get();
            const authUser = updateAuthUser();
            
            if (authUser) {
                
                const item =    searchResult.filter(item => item.imageId===imageId)[0] ||
                                userCollections.flatMap(collection => collection.items).
                                filter(item => item.imageId===imageId)[0]
                
                if (!item) {
                    toast.error("Image "+imageId+" does not exist") 
                    return
                }
                
                const response = await axiosInstance.post('/images/add', {item, collectionName});

                if (response.status==200) {
                    set({userCollections: response.data.payload});
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    removeImage: async (imageId, collectionName) => {
        try {
            const {updateAuthUser, searchResult, userCollections} = get();
            const authUser = updateAuthUser();
            
            if (authUser) {
                const item =    userCollections.flatMap(collection => collection.items).
                                filter(item => item.imageId===imageId)[0]
                
                if (!item) {
                    toast.error("Image "+imageId+" does not exist in collections") 
                    return
                }
                
                const response = await axiosInstance.post('/images/remove', {item, collectionName});

                if (response.status==200) {
                    set({userCollections: response.data.payload});
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

}));