import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

function Profile() {
  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-[48vw] min-h-[200px] mt-20 rounded-lg shadow-lg flex items-center justify-center bg-gray-300 mx-auto">
          <div className="w-[46vw] min-h-[170px] rounded-lg flex items-center flex-col justify-center bg-gray-200 shadow-md">
            <div className="h-12 w-[42vw] mb-3 flex items-center pl-4 text-gray-500 bg-white rounded-md">
              SATADIP DEBNATH
            </div>
            <div className="h-12 w-[42vw] bg-white mb-3 flex items-center pl-4 text-gray-500 rounded-md">
              d.satadip@iitg.ac.in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
