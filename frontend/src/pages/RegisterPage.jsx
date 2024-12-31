import { useState } from "react";
import { useUserStore } from '../store/useUserStore.js'
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName : "",
        email : "",
        password : ""
    });

    const {register, isSigningUp} = useUserStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
        if (!/\d/.test(formData.password.trim())) return toast.error("Add at least one number");
        if (!/[A-Z]/.test(formData.password.trim()) || !/[a-z]/.test(formData.password.trim())) return toast.error('Include both upper and lower case letters');
        if (!/[^A-Za-z0-9]/.test(formData.password.trim())) return toast.error('Include at least one special character');
        
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();
        if(success===true) register(formData);
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                {/* Welcome Text */}
                <div className="flex flex-col items-center gap-2 text-center mb-8 group">
                    <h1 className="text-2xl font-semibold mt-2">Create Account</h1>
                    <p className="font-light">Get started with your free account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                    {/* Full name */}
                    <label className="text-md font-medium mt-4">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className= 'h-12 border-2 rounded shadow bg-white w-full pl-10 outline-none'
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />

                    {/* Email */}
                    <label className="text-md font-medium mt-4">
                        Email
                    </label>
                    <input
                        type="email"
                        className= 'h-12 border-2 rounded shadow bg-white w-full pl-10 outline-none'
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    {/* Password */}
                    <label className="text-md font-medium mt-4">
                        Password
                    </label>
                    <div className="flex justify-between h-12 border-2 rounded shadow bg-white w-full pr-4 gap-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            className= 'w-full pl-10 outline-none'
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button 
                            className=""
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword? 
                                    <img className="w-5 rounded-full" src={assets.hide_eye} alt="Hide password" />
                                :   <img className="w-5 rounded-full" src={assets.show_eye} alt="Show password" />
                            }
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className={`text-white ${isSigningUp? 'bg-white' : 'bg-gray-400'} h-12 w-full mt-5 rounded transition-all`} 
                        disabled={isSigningUp}
                    >
                    {isSigningUp ? (
                        <>
                        <span class="animate-ping inline-flex h-3 w-3 mr-3 rounded-full bg-gray-500 opacity-75"></span>
                        </>
                    ) : (
                        "Create Account"
                    )}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-base-content/60">
                        Already have an account?{" "}
                        <Link to="/login" className="text-gray-400">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
};
export default RegisterPage;