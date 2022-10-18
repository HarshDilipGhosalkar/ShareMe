import React from 'react';
// import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from "axios"
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })
                const { name, picture, sub } = res.data;

                const doc = {
                    _id: sub,
                    _type: 'user',
                    userName: name,
                    image: picture,
                };
                localStorage.setItem('user', JSON.stringify(doc));

                client.createIfNotExists(doc).then(() => {
                    navigate('/', { replace: true });
                });
            } catch (err) {
                console.log(err)

            }

        }

    });
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className=" relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />

                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" />
                    </div>

                    <div className="shadow-2xl">

                        <button
                            type="button"
                            className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                            onClick={() => login()}

                        >
                            <FcGoogle className="mr-4" /> Sign in with google
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;