import { Link, NavLink } from 'react-router-dom';
import {assets} from '../assets/assets.js';
import { useUserStore } from '../store/useUserStore.js';

const NavBar = () => {
    const {authUser} = useUserStore();

    return (
        <div className='w-full' >
            <div className='flex items-center justify-between px-5 md:px-10 py-3'>
                <div>
                    <Link to='/'>
                        <img className='' src={assets.logo} alt="unsplash collection" />
                    </Link>
                </div>

                <ul className='flex items-center justify-between gap-1'>
                    <NavLink to='/'>
                        <p className='text-sm md:text-base py-2 px-2 md:px-6 rounded color-secondary transition-all'>Home</p>
                    </NavLink>
                    <NavLink to='/collection'>
                        <p className='text-sm md:text-base py-2 px-2 md:px-6 rounded color-secondary transition-all'>Collections</p>
                    </NavLink>
                    {
                        authUser ?
                        <NavLink to='/profile'>
                            <p className='text-sm md:text-base py-2 px-2 md:px-6 rounded color-secondary transition-all'>Profile</p>
                        </NavLink> :
                        <NavLink to='/login'>
                            <p className='text-sm md:text-base py-2 px-2 md:px-6 rounded color-secondary transition-all'>Login</p>
                        </NavLink>
                    }
                    
                </ul>
            </div>
            <hr className='w-full border-none bg-gray-200 h-[1.5px]'/>
        </div>
    )
}

export default NavBar