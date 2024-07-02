import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";


function AirlineManagement() {

    const [flightCounts, setFlightCounts] = useState([]);

    useEffect(() => {
        const fetchFlightCounts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/airlines');
                const data = await response.json();
                setFlightCounts(data);
                console.log(data);
            } catch (error) {
                setError('Error fetching data');
                setFlightCounts([]);
            }
        };
        fetchFlightCounts();
    }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9 ">
        <AdminNav />
        <div className="w-[70vw] min-h-[220px] p-4 mt-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl text-gray-500 font-semibold">Airline Details</h1>
            <Link to='/admin/addairline'><button
              type="button"
              class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            ><i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
              ADD NEW AIRLINE
            </button></Link>
          </div>
          {/* <div>
            <div className="search-container flex items-center mb-3">
              <form action="/action_page.php">
                <input
                  type="text"
                  className="border-2 border-black w-[200px] mr-4 rounded-lg px-2"
                  placeholder="Search Here"
                  name="search"
                />
                <button type="submit" className="mr-2">
                  <i className="fa fa-search"></i>
                </button>
              </form>
              <span className="text-gray-600">
                (You can search airline details using name,id)
              </span>
            </div>
          </div> */}
          <div>
            <table className="table-auto border-collapse border border-slate-500 min-w-full">
              <tr className="even:bg-gray-100">
                <th className="border border-slate-600">#</th>
                <th className="border border-slate-600">AIRLINE NAME</th>
                <th className="border border-slate-600">AIRLINE CODE</th>
                <th className="border border-slate-600">NO OF FLIGHTS</th>
                <th className="border border-slate-600">MAKE CHANGES</th>
                {/* <th className="border border-slate-600">ADDED DATE</th> */}
              </tr>
              {flightCounts.map((flights, index) => (
                  <tr key={index} className="even:bg-zinc-300">
                    <td className="border border-slate-600 text-center px-4 py-2 font-bold">{index+1}</td>
                    <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flights.flightName}</td>
                    <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flights.flightCode}</td>
                    <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flights.flights.length}</td>
                    <td className="border border-slate-600 px-4 py-2 font-bold">
                      <div className="flex items-center justify-center">
                        {flights.flights.length > 0 ? (
                          <Link to='/admin/viewflt' state={{flightCode: flights.flightCode}}><button type="button" className="font-bold focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View Flight(s)
                          </button></Link>
                        ):(<div></div>)}
                        <Link to='/admin/addflt' state={{flightName: flights.flightName, flightCode: flights.flightCode, flights: flights.flights}}>
                        <button type="button" className="font-bold focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 m-2">
                          Add Flight
                        </button></Link>
                          <button type="button" className="font-bold focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Delete
                          </button>
                      </div>
                    </td>
                    {/* <td className="border border-slate-600 text-center">
                      27-03-2024
                    </td> */}
                  </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirlineManagement;
