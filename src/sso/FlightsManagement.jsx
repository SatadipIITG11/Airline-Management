import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import AdminMenu from "../components/AdminMenu";


const FlightsManagement = () => {
  const [flights, setFlights] = useState([]);

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/flightinfo');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const flightsData = await response.json();

  //       const flightsWithDetails = [];
  //       for (const flight_ of flightsData) {
  //         const detailsResponse = await fetch('http://localhost:3000/api/flights');
  //         if (detailsResponse.ok) {
  //           const detailsData = await detailsResponse.json();
  //           const flightDetails = detailsData.filter(flight =>
  //             flight.flightNumber === flight_.flightNumber
  //             );
  //           if(flightDetails.length > 0)
  //           {
  //             flightsWithDetails.push({
  //               ...flight_,
  //               flightName: flightDetails[0].flightName
  //             });
  //           }
  //         }
  //       }
  //       console.log(flightsWithDetails)
  //       setFlights(flightsWithDetails);

  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchFlights();
  // }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
          const response = await fetch('http://localhost:3000/api/flights');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const flightsData = await response.json();
  
          // const flightsWithDetails = [];
          // for (const flight_ of flightsData) {
          //   const detailsResponse = await fetch('http://localhost:3000/api/flights');
          //   if (detailsResponse.ok) {
          //     const detailsData = await detailsResponse.json();
          //     const flightDetails = detailsData.filter(flight =>
          //       flight.flightNumber === flight_.flightNumber
          //       );
          //     if(flightDetails.length > 0)
          //     {
          //       flightsWithDetails.push({
          //         ...flight_,
          //         flightName: flightDetails[0].flightName
          //       });
          //     }
          //   }
          // }
          // console.log(flightsWithDetails)
          // setFlights(flightsWithDetails);
          console.log(flightsData);
          setFlights(flightsData);
  
        } catch (error) {
          setError(error.message);
        }
    };

    fetchFlights();
  }, []);
  

  console.log(flights);

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-full bg-white relative rounded-xl shadow-lg p-6 py-8 mt-10">
          <div className="flex justify-between">
            <div className="text-4xl font-semibold text-slate-600">
              Available Flight Details
            </div>
            {/* <Link to="/admin/scheduleflt">
              <button className="bg-[#ffc637] px-5 py-2 rounded-md font-bold flex items-center cursor-pointer">
              <i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
                <span className="ml-1">Schedule Flight</span>
              </button>
            </Link> */}
          </div>
          <div className="flex mt-12">
            <input
              type="search"
              name="query"
              autoComplete="on"
              placeholder="you can search here"
              className="border-2 w-64 p-1 rounded-md"
            ></input>
            <button
              type="submit"
              className="bg-[#383eff] px-3 rounded-md ml-4 text-white flex items-center cursor-pointer"
            >
              <span className='mr-1'>Search</span>
              <i className="fa fa-search"></i>
            </button>
            <p className="text-slate-400 mt-1 ml-2">
              (You can search using flight number)
            </p>
          </div>
          <div className="mt-8">
            <table className="border-2 border-collapse w-full table-auto text-center">
              <thead className="border-2">
                <tr>
                  <th className="border-2 px-4 py-2">#</th>
                  <th className="border-2 px-4 py-2">AIRLINE NAME</th>
                  <th className="border-2 px-4 py-2">FLIGHT NO</th>
                  <th className="border-2 px-4 py-2">ORIGIN AIRPORT</th>
                  <th className="border-2 px-4 py-2">DESTINATION AIRPORT</th>
                  {/* <th className="border-2 px-4 py-2">SCHEDULED DEPARTURE</th> */}
                  {/* <th className="border-2 px-4 py-2">ECONOMY CLASS SEATS</th> */}
                  {/* <th className="border-2 px-4 py-2">BUSINESS CLASS SEATS</th> */}
                  {/* <th className="border-2 px-4 py-2">FIRST CLASS SEATS</th> */}
                  {/* <th className="border-2 px-4 py-2">TOTAL SEATS</th>
                  <th className="border-2 px-4 py-2">ECONOMY CLASS PRICE</th>
                  <th className="border-2 px-4 py-2">BUSINESS CLASS PRICE</th>
                  <th className="border-2 px-4 py-2">FIRST CLASS PRICE</th> */}
                  <th className="border-2 px-4 py-2">MAKE CHANGES</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight, index) => (
                <tr key={index} className="border-2">
                  <td className="border-2 px-4 py-2">{index+1}</td>
                  <td className="border-2 px-4 py-2">{flight.flightName}</td>
                  <td className="border-2 px-4 py-2">{flight.flightNumber}</td>
                  <td className="border-2 px-4 py-2">{flight.originAirport}</td>
                  <td className="border-2 px-4 py-2">{flight.destinationAirport}</td>
                  {/* <td className="border-2 px-4 py-2">{flight.departureDate}</td>
                  <td className="border-2 px-4 py-2">{flight.seatsAvailable.economy}</td>
                  <td className="border-2 px-4 py-2">{flight.seatsAvailable.business}</td>
                  <td className="border-2 px-4 py-2">{flight.seatsAvailable.first}</td>
                  <td className="border-2 px-4 py-2">{flight.seatsAvailable.economy+flight.seatsAvailable.business+flight.seatsAvailable.first}</td>
                  <td className="border-2 px-4 py-2">{flight.prices.economy}</td>
                  <td className="border-2 px-4 py-2">{flight.prices.business}</td>
                  <td className="border-2 px-4 py-2">{flight.prices.first}</td> */}
                  <td className="border-2 ">
                    <div className="flex gap-1 justify-center">
                      <button type="button" className="font-bold focus:outline-none w-20 text-white bg-[#24ae32] hover:bg-[#197c23] focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 m-2 mr-1">
                          Edit
                      </button>
                      <Link to='/admin/scheduleflt' state={{flightName: flight.flightName, flightNumber: flight.flightNumber, originAirport: flight.originAirport, destinationAirport: flight.destinationAirport}}><button type="button" className="font-bold focus:outline-none w-30 text-white bg-[#b15dd4] hover:bg-[#8c49a8] focus:ring-4 focus:ring-[#dea4f7] rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2 mb-2">
                          Schedule
                      </button></Link>
                      <button type="button" className="font-bold focus:outline-none w-30 text-white bg-[#ff3838] hover:bg-[#ac2525] focus:ring-4 focus:ring-[#ff9494] rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2 mb-2 ml-1 mr-2">
                          Remove
                      </button>
                      {/* <button className="bg-[#2ad33b] w-20 py-0.5 rounded-md text-white cursor-pointer">
                        Edit
                      </button> */}
                      {/* <button className="bg-[#d470ff] w-20 py-0.5 rounded-md text-white cursor-pointer">
                        Schedule
                      </button> */}
                      {/* <button className="bg-[#ff3838] w-20 py-0.5 rounded-md text-white cursor-pointer">
                        Remove
                      </button> */}
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsManagement;
