import React from 'react'
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <div className='w-full md:w-[300px] h-auto md:h-[600px] bg-gray-950 mt-4 rounded-lg grid grid-rows-12 px-10 pb-8'>
        <div className='row-span-1 rounded-lg flex items-center justify-center text-white'>PROFILE</div>
        <div className='row-span-7 rounded-lg grid grid-rows-7 gap-2 md:gap-0'>
            <Link to='/admin/dashboard' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg  flex items-center justify-center'>Dashboard</Link>
            <Link to='/admin/userinfo' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg  flex items-center justify-center'>User Information</Link>
            <Link to='/admin/airlinemanagement' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Airline Management</Link>
            <Link to='/admin/fltmanagement' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Flights Management</Link>
            <Link to='/admin/scheduled' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Scheduled Flight</Link>
            <Link to='/admin/bookings' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Bookings</Link>
            <Link to='/admin/feedback' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Feedback</Link>
        </div>
        <div className='row-span-4 rounded-lg grid grid-rows-3 gap-2 md:gap-0'>
            <div className='row-span-1 text-white flex items-center justify-center'>ACCOUNT PAGES</div>
            <Link to='/admin/profile' className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Profile</Link>
            <div className='row-span-1 text-white hover:bg-pink-800 hover:rounded-lg flex items-center justify-center'>Logout</div>
            
        </div>
    </div>
  )
}

export default AdminMenu