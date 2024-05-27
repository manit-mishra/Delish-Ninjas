import React from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo.png';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { BsCartFill } from 'react-icons/bs';
import { useState } from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(preve => !preve);
    }
    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logged out successfully");
    }

    const userData = useSelector((state) => state.user);
    // console.log(userData);
    const dispatch = useDispatch();

    // console.log(process.env.REACT_APP_ADMIN_EMAIL);
    const cartItemNumber = useSelector((state)=>state.product.cartItem);
    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white drop-shadow-md'>
            {/* desktop */}
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-12'>
                        <img src={logo} className="h-10 mt-4" />
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-7">
                    <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={""}>Home</Link>
                        {/* <Link to={"menu/652def13148901dd72950a2f"}>Menu</Link> */}
                        <Link to={"menu"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative">
                        <Link to="cart">
                            <BsCartFill />
                            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div className="text-slate-600" onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer h-8 w-8 rounded-full overflow-hidden drop-sdahow-md">
                            {userData.image ? <img src={userData.image} className="h-full w-full" /> : <HiOutlineUserCircle className="h-full w-full" />}
                        </div>

                        {
                            showMenu && (
                                <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                                    {
                                        userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer">New product</Link>
                                    }


                                    {
                                        userData.image ? <p className=" cursor-pointer text-red-500" onClick={handleLogout}>Logout ({userData.firstName})</p> : <Link to={"login"} className="whitespace-nowrap cursor-pointer">Login</Link>
                                    }

                                    <nav className='text-base md:text-lg flex flex-col md:hidden'>
                                        <Link to={""} className='px-2'>Home</Link>
                                        {/* <Link to={"menu/652def13148901dd72950a2f"} className='px-2'>Menu</Link> */}
                                        <Link to={"menu"} className='px-2'>Menu</Link>
                                        <Link to={"about"} className='px-2'>About</Link>
                                        <Link to={"contact"} className='px-2'>Contact</Link>
                                    </nav>

                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

            {/* mobile */}
        </header>
    )
}

export default Header;