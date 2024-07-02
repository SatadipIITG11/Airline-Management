import React from 'react'
import AdminMenu from '../components/AdminMenu';
import AdminNav from '../components/AdminNav';


function AdminDashboard() {
    return (
        <div className="grid grid-cols-12 min-h-screen min-w-screen">
          <div className='min-h-screen col-span-3 flex flex-col items-center'>
           <AdminMenu/>
          </div>
          <div className=' min-h-screen col-span-9'>
           <AdminNav/>
          </div>
        </div>
      );
}

export default AdminDashboard