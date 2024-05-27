import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSignupImage from '../Images/login-animation.gif';
import { BiShow, BiHide } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(preve => !preve);
    }

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataRes = await fetchData.json();
            console.log(dataRes);
            toast(dataRes.message);

            if (dataRes.alert) {
                dispatch(loginRedux(dataRes));
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        }
        else {
            alert('Please enter required fields');
        }
    }

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div className='pl-3 pr-3 pb-3 pt-20 md:pl-4 md:pr-4 md:pb-4 md:pt-20'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-2'>
                {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1>    */}
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                    <img src={loginSignupImage} className='w-full' />
                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input type={"email"} id="email" name='email' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.email}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="password">Password</label>
                    <div className='flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-300'>
                        <input type={showPassword ? "text" : "password"} id="password" name='password' className='w-full bg-slate-200 border-none outline-none border-none outline-none'
                            value={data.password}
                            onChange={handleOnChange}
                        />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button className='w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>
                </form>
                <p className='text-left text-sm mt-2'>Don't have account ? <Link to={"/Signup"} className='text-red-500 underline'>Sign Up</Link></p>
            </div>
        </div>
    )
}
export default Login;

