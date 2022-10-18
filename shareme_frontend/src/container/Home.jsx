import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { userQuery } from '../utils/data';
import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
import Pins from './Pins';
import logo from '../assets/logo.png';
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {

    const query = userQuery(userInfo?._id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  // useEffect(() => {
  //   scrollRef.current.scrollTo(0, 0);
  // });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
            <h1></h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home