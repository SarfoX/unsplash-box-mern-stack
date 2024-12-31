import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from "react-hot-toast";

export const useUserStore = create((set, get)=>({

    authUser: null,
    isRegistering: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/user/check");
            if (res.status===200) set({authUser:res.data});
        } catch (error) {
            // toast.error(error.response.data.message);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    register: async (data) => {
        set({isRegistering: true});
        try {
            const response = await axiosInstance.post("/user/register", data);
            set({authUser: response.data})
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isRegistering: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const response = await axiosInstance.post("/user/login", data);
            if (response.status===200) {
                set({ authUser: response.data });
                toast.success("Logged in successfully");
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        set({isLoggingOut: true});
        try {
            await axiosInstance.post("/user/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoggingOut: false});
        }
    },

}));