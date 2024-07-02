import React from 'react'

function AdminNav() {
  return (
    <div className='admin-nav flex items-center justify-between px-4 md:px-10 h-[50px]'>
        <a href='/' className='logo font-bold text-2xl flex items-center'><img src="https://img.icons8.com/?size=256&id=48352&format=png" alt="" className='h-16 w-16 mt-2'/><span className='ml-2'>FlyHigh</span></a>
        <div className='flex flex-col md:flex-row items-center md:w-[600px] justify-end'>
         {/* <a href='/admin/addflt' className='w-full md:w-[180px] font-bold'><i className="fa-solid fa-plane pr-2"></i>ADD NEW FLIGHT</a> */}
         {/* <a href='/admin/addairline' className='w-full md:w-[190px] font-bold'><i className="fa-solid fa-plane-departure pr-2"></i>ADD NEW AIRPLANE</a> */}
         <a href='/admin/profile' className='w-full md:w-[150px] font-bold text-orange-400'>PROFILE<i class="fa-solid fa-right-from-bracket pl-2"></i></a>
        </div>
    </div>
  )
}

export default AdminNav