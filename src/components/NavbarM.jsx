import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavbarM = ({user}) => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleUserCheck = (e) => {
        if (!user) {
            e.preventDefault();
            alert('You must be logged in to access this page.');
        }
    };

  return (
    <nav className="flex justify-around items-center bg-black text-white h-16 gap-4 md:gap-11 sticky top-0 z-10">
        <button
        className="md:hidden block text-xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>
    <div className="flex justify-center items-center gap-2 md:gap-4">
        <img src="/plane.png" alt="" className="h-8 w-8 md:h-10 md:w-10" />
        <div className="logo font-bold text-lg md:text-xl">
        Flyhigh
        </div>
    </div>
    <div
        className={`fixed top-0 left-0 h-full bg-black text-white p-8 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <button
          className="text-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ✕
        </button>
        <ul className="flex flex-col gap-4 mt-4">
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link></li>
          <li>{user ? (
            <Link to="/myflts" state={{ email: user.email }} onClick={(e) => { handleUserCheck(e); setIsMobileMenuOpen(false); }}>MY FLIGHTS</Link>
          ) : (
            <Link to="/" onClick={(e) => { handleUserCheck(e); setIsMobileMenuOpen(false); }}>MY FLIGHTS</Link>
          )}
          </li>
          <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link></li>
          <li>{user ? (
            <Link to="/feedback" onClick={(e) => { handleUserCheck(e); setIsMobileMenuOpen(false); }}>FEEDBACK</Link>
          ) : (
            <Link to="/" onClick={(e) => { handleUserCheck(e); setIsMobileMenuOpen(false); }}>FEEDBACK</Link>
          )}
          </li>
        </ul>
      </div>
    <div className="hidden md:block">
        <ul className="flex font-bold gap-4 md:gap-20">
            <li><Link to="/" >HOME</Link></li>
            <li>{user ? (<Link to="/myflts" state={{email: user.email}} onClick={handleUserCheck}>MY FLIGHTS</Link>) : (<Link to="/" onClick={handleUserCheck}>MY FLIGHTS</Link>)}</li>
            <li><Link to="/about">ABOUT</Link></li>
            <li>{user ? (<Link to="/feedback" onClick={handleUserCheck}>FEEDBACK</Link>) : (<Link to="/" onClick={handleUserCheck}>FEEDBACK</Link>)}</li>
        </ul>
    </div>
    {/* <div id="google_translate"></div> */}
    {user ? (<Link to='/user' state={{userData: user}}><div className='flex justify-center items-center gap-2'>
        <img src="/avatar.png" alt="" className='h-5 w-5 md:h-6 md:w-6'/>
        <div className='font-bold text-sm md:text-base'>{user.title} {user.firstName} {user.lastName}</div>
        </div></Link>):(<div></div>)}
    {/* {!user ? (
        <Link to="/login">
        <div className="btn flex justify-center items-center border-2 p-2 px-4 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 transition duration-300 hover:border-blue-950 hover:text-blue-950">
            <button className='font-bold text-xl'>Login</button>
            <img src="/login.svg" className="h-8 invert hover:filter-none" alt="login" />
        </div>
        </Link>
    ) : (
        <>
        <div className='flex justify-center items-center gap-2'>
        <img src="/avatar.png" alt="" className='h-5 w-5'/>
        <div className='font-bold'>{user.title} {user.firstName} {user.lastName}</div>
        </div>
        <Link to="/">
        <div onClick={handleLogout} className="btn flex justify-center items-center border-2 p-2 px-4 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 transition duration-300 hover:border-blue-950 hover:text-blue-950">
            <button className='font-bold text-xl'>Logout</button>
            <img src="/logout.svg" className="h-8 invert hover:filter-none" alt="login" />
        </div>
        </Link>
        </>
    )} */}
    </nav>
  )
}

export default NavbarM
