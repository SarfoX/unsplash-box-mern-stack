import { useState } from "react";
import { useUserStore } from '../store/useUserStore.js'
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {login, isLoggingIn} = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                {/* Welcome Text */}
                <div className="flex flex-col items-center gap-2 text-center mb-8 group">
                    <h1 className="text-2xl font-semibold mt-2">Welcome Back</h1>
                    <p className="font-light">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">

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
                        className={`text-white ${isLoggingIn? 'bg-white' : 'bg-gray-400'} h-12 w-full mt-5 rounded transition-all`} 
                        disabled={isLoggingIn}
                    >
                    {isLoggingIn ? (
                        <>
                        <span class="animate-ping inline-flex h-3 w-3 mr-3 rounded-full bg-gray-500 opacity-75"></span>
                        </>
                    ) : (
                        "Sign in"
                    )}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-base-content/60">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="text-gray-400">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
};
export default LoginPage;