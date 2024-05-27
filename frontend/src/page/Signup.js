import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSignupImage from '../Images/login-animation.gif';
import { BiShow, BiHide } from 'react-icons/bi';
import {ImagetoBase64} from '../utility/ImagetoBase64';
import {toast} from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(preve => !preve);
    }

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(preve => !preve);
    }

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image:"",
    });

    console.log(data);

    const handleOnChange = (e) => {
        const {name,value} = e.target;
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }

    const handleUploadProfileImage=async(e)=>{
        // console.log(e.target.files[0]);
        const data = await ImagetoBase64(e.target.files[0]);
        console.log(data);
        setData((preve)=>{
            return{
                ...preve,
                image:data
            }
        })
    }
console.log(process.env.REACT_APP_SERVER_DOMAIN);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {firstName, lastName, email, password, confirmPassword} = data;
        if(firstName && lastName && email && password && confirmPassword){
            if(password===confirmPassword){

                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
                    method: "POST",
                    headers: {
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(data)
                });

                const dataRes = await fetchData.json();
                console.log(dataRes);

                // alert(dataRes.message);
                toast(dataRes.message);
                if(dataRes.alert){
                    navigate('/login');
                }

                // const handleSubmit = async (e) => {
                //     e.preventDefault();
                  
                //     const { firstName, lastName, email, password, confirmPassword, image } = data;
                  
                //     if (firstName && lastName && email && password && confirmPassword) {
                //       if (password === confirmPassword) {
                //         try {
                //           const formData = new FormData();
                //           formData.append('firstName', firstName);
                //           formData.append('lastName', lastName);
                //           formData.append('email', email);
                //           formData.append('password', password);
                //           formData.append('image', image);
                  
                //           const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/Signup`, {
                //             method: 'POST',
                //             body: formData,
                //           });
                  
                //           if (!fetchData.ok) {
                //             // Handle the error, e.g., by displaying an error message to the user.
                //             console.error(`Error: ${fetchData.status}`);
                //           } else {
                //             const dataRes = await fetchData.json();
                //             console.log(dataRes);
                //             // Add any code to handle the response data here
                //             alert('Successful');
                //             navigate('/login');
                //           }
                //         } catch (error) {
                //           // Handle any other errors that may occur
                //           console.error('An error occurred:', error);
                //         }
                //       } else {
                //         alert('Password and Confirm Password are not equal');
                //       }
                //     } else {
                //       alert('Please enter required fields');
                //     }
                //   };
                  
            }
            else{
                alert('Password and Confirm Password are not equal');
            }
        }
        else{
            alert('Please enter required fields');
        }
    }

    return (
        <div className='pl-3 pr-3 pb-3 pt-20 md:pl-4 md:pr-4 md:pb-4 md:pt-20'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-2'>
                {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1>    */}
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    <img src={data.image ? data.image : loginSignupImage} className='w-full h-full' />

                    <label htmlFor="profileImage">
                    <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                        <p className='text-sm p-1 text-white'>Upload</p>
                    </div>
                    <input type={'file'} id='profileImage' accept = 'image/*' className='hidden' onChange={handleUploadProfileImage}/>
                    
                    {/* To upload image or video */}
                    {/* <input type={'file'} id='profileImage' className='hidden' onChange={handleUploadProfileImage}/> */}
                    
                    </label>
                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input type={"text"} id="firstName" name='firstName' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.firstName}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input type={"text"} id="lastName" name='lastName' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.lastName}
                        onChange={handleOnChange}
                    />

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

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className='flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-300'>
                        <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name='confirmPassword' className='w-full bg-slate-200 border-none outline-none border-none outline-none'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                        />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                    </div>
                    <button className='w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>
                </form>
                <p className='text-left text-sm mt-2'>Already have account ? <Link to={"/login"} className='text-red-500 underline'>Login</Link></p>
            </div>
        </div>
    )
}
export default Signup;