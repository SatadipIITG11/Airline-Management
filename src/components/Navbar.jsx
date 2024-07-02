import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({user, setUser}) => {
  const [navbar, setNavbar] = useState(false);
  const bgchange = () => {
    if(window.scrollY >= 90)
      setNavbar(true);
    else
      setNavbar(false);
  }
  window.addEventListener('scroll', bgchange)

  const handleUserCheck = (e) => {
    if (!user) {
      e.preventDefault();
      alert('You must be logged in to access this page.');
    }
  };

  const status = async () => {
    console.log('Status Update');
      const response = await fetch('http://localhost:3000/api/update-profile-on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          status: 0,
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}, ${errorMessage}`);
      }
      const result = await response.json();
      console.log('Status:', result);
  };

  const handleLogout = () => {
    setUser(null);
    status();
  };
  return (
    <nav className={`${navbar ? 'bg-black' : 'bg-transparent'} flex justify-between items-center text-white h-16 gap-4 px-6 sticky top-0 z-10 transition-all duration-300`}>
    {/* <nav className={navbar ? "flex justify-around items-center bg-black text-white h-16 gap-11 sticky top-0 z-10":"flex justify-around items-center bg-transparent text-white h-16 gap-11 sticky top-0 z-10"}> */}
      <div className='flex justify-center items-center gap-4'>
        <img src="/plane.png" alt=""/>
        <div className="logo font-bold text-xl">
          Flyhigh
        </div>
      </div>
      <div className="">
        <ul className="flex font-bold gap-20">
            <li><Link to="/">HOME</Link></li>
            <li>{user ? (<Link to="/myflts" state={{email: user.email}} onClick={handleUserCheck}>MY FLIGHTS</Link>) : (<Link to="/" onClick={handleUserCheck}>MY FLIGHTS</Link>)}</li>
            <li><Link to="/about">ABOUT</Link></li>
            <li>{user ? (<Link to="/feedback" onClick={handleUserCheck}>FEEDBACK</Link>) : (<Link to="/" onClick={handleUserCheck}>FEEDBACK</Link>)}</li>
        </ul>
      </div>
      {/* <div id="google_translate"></div> */}
      {!user ? (
        <Link to="/login">
        <div className="btn flex justify-center items-center border-2 p-2 px-4 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 transition duration-300 hover:border-blue-950 hover:text-blue-950">
            <button className='font-bold text-xl'>Login</button>
            <img src="/login.svg" className="h-8 invert hover:filter-none" alt="login" />
        </div>
        </Link>
      ) : (
        <>
        <Link to='/user' state={{userData: user}}><div className='flex justify-center items-center gap-2'>
          <img src="/avatar.png" alt="" className='h-5 w-5'/>
          <div className='font-bold'>{user.title} {user.firstName} {user.lastName}</div>
        </div></Link>
        <Link to="/">
        <div onClick={handleLogout} className="btn flex justify-center items-center border-2 p-2 px-4 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 transition duration-300 hover:border-blue-950 hover:text-blue-950">
            <button className='font-bold text-xl'>Logout</button>
            <img src="/logout.svg" className="h-8 invert hover:filter-none" alt="login" />
        </div>
        </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
