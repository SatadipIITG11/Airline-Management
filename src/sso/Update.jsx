import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

function Update() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
        const response = await fetch('http://localhost:3000/api/flightinfo');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const flightsData = await response.json();
        // console.log(flightsData);

        const flightsWithDetails = [];
        for (const flight_ of flightsData) {
          const detailsResponse = await fetch('http://localhost:3000/api/flights');
          if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            const flightDetails = detailsData.filter(flight =>
              flight.flightNumber === flight_.flightNumber
              );
            if(flightDetails.length > 0)
            {
              flightsWithDetails.push({
                ...flight_,
                flightName: flightDetails[0].flightName,
                originAirport: flightDetails[0].originAirport,
                destinationAirport: flightDetails[0].destinationAirport,
              });
            }
          }
        }
        console.log(flightsWithDetails)
        setFlights(flightsWithDetails);
    };

    fetchFlights();
  }, []);

  const formatDateTime = (dateTimeString) => {
    if (typeof dateTimeString !== 'string')
    return "Invalid Date";
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const getStatus = (departureTime, arrivalTime) => {
    const currentTime = new Date();
    const departureDateTime = new Date(departureTime);
    const arrivalDateTime = new Date(arrivalTime);

    console.log(currentTime);
    if (currentTime < departureDateTime) return 'Yet to Depart';
    if (currentTime >= departureDateTime && currentTime < arrivalDateTime) return 'In Flight';
    if (currentTime >= arrivalDateTime) return 'Arrived';
    return 'Departed';
};

useEffect(() => {
  const intervalId = setInterval(() => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) => ({
        ...flight,
        status: getStatus(flight.selectedDate, flight.departureTime, flight.arrivalTime)
      }))
    );
  }, 1000);

  return () => clearInterval(intervalId);
}, [flights]);


  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-full bg-white relative rounded-xl shadow-lg p-6 pt-8 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-semibold text-slate-600">
              SCHEDULED FLIGHTS DETAILS
            </div>
            {/* <Link to="http:localhost:5173/admin/updateflt">
              <button className="bg-[#ffc637] px-5 py-2 rounded-md font-bold flex items-center cursor-pointer">
              <i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
                <span className="ml-1">SCHEDULE FLIGHT</span>
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
                  <th className="border-2 px-4 py-2">SRC</th>
                  <th className="border-2 px-4 py-2">DEST</th>
                  <th className="border-2 px-4 py-2">DEPT DATE & TIME</th>
                  <th className="border-2 px-4 py-2">ARR DATE & TIME</th>
                  <th className="border-2 px-4 py-2">
                    SEAT CONFIGURATION
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div className="bg-gray-200 p-1 rounded" title="Economy Class">E</div>
                      <div className="bg-gray-200 p-1 rounded" title="Business Class">B</div>
                      <div className="bg-gray-200 p-1 rounded" title="First Class">F</div>
                    </div>
                  </th>
                  <th className="border-2 px-4 py-2">TOTAL SEATS</th>
                  <th className="border-2 px-4 py-2">
                    COST CONFIGURATION
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div className="bg-gray-200 p-1 rounded" title="Economy Class">E</div>
                      <div className="bg-gray-200 p-1 rounded" title="Business Class">B</div>
                      <div className="bg-gray-200 p-1 rounded" title="First Class">F</div>
                    </div>
                  </th>
                  {/* <th className="border-2">CEC</th>
                  <th className="border-2">CBC</th>
                  <th className="border-2">CFC</th> */}
                  <th className="border-2 px-4 py-2">MAKE CHANGES</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td className="border-2 px-4 py-2">3</td>
                  <td className="border-2 px-4 py-2">Vistara</td>
                  <td className="border-2 px-4 py-2">506</td>
                  <td className="border-2 px-4 py-2">NSK</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">2024-05-05 23:46</td>
                  <td className="border-2 px-4 py-2">2024-05-06 01:45</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">BOM</td> */}
                  {/* <td className="border-2">1000</td>
                  <td className="border-2">8000</td>
                  <td className="border-2">5000</td> */}
                  {/* <td className="border-2 px-4 py-2">
                    <div className="flex gap-1 justify-center">
                      <button className="bg-[#bf2ad3] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        Edit
                      </button>
                      <button className="bg-[#ff3838] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        Remove
                      </button>
                      <button className="bg-[#65a0ff] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        View
                      </button>
                    </div>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className="border-2 px-4 py-2">3</td>
                  <td className="border-2 px-4 py-2">Emirates</td>
                  <td className="border-2 px-4 py-2">108</td>
                  <td className="border-2 px-4 py-2">NSK</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">2024-05-04 23:50</td>
                  <td className="border-2 px-4 py-2">2024-05-05 00:50</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">BOM</td>
                  <td className="border-2 px-4 py-2">BOM</td> */}
                  {/* <td className="border-2">1000</td>
                  <td className="border-2">8000</td>
                  <td className="border-2">5000</td> */}
                  {/* <td className="border-2 px-4 py-2">
                    <div className="flex gap-1 justify-center">
                      <button className="bg-[#d3e73e] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        Running
                      </button>
                      <button className="bg-[#65a0ff] px-2 py-0.5 rounded-md text-white cursor-pointer">
                        View
                      </button>
                    </div>
                  </td>
                </tr> */}
                {flights.map((flights, index) => (
                  <tr key={index}>
                    <td className="border-2 px-4 py-2">{index+1}</td>
                    <td className="border-2 px-4 py-2">{flights.flightName}</td>
                    <td className="border-2 px-4 py-2">{flights.flightNumber}</td>
                    <td className="border-2 px-4 py-2">{flights.originAirport}</td>
                    <td className="border-2 px-4 py-2">{flights.destinationAirport}</td>
                    <td className="border-2 px-4 py-2">{formatDateTime(flights.newdepTime)}</td>
                    <td className="border-2 px-4 py-2">{formatDateTime(flights.newarrTime)}</td>
                    {/* <td className="border-2 px-4 py-2">{flights.seatsAvailable.economy}, {flights.seatsAvailable.business}, {flights.seatsAvailable.first}</td> */}
                    <td className="border-2 px-4 py-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gray-200 p-1 rounded">{flights.seatsAvailable.economy}</div>
                        <div className="bg-gray-200 p-1 rounded">{flights.seatsAvailable.business}</div>
                        <div className="bg-gray-200 p-1 rounded">{flights.seatsAvailable.first}</div>
                      </div>
                    </td>
                    <td className="border-2 px-4 py-2">{flights.seatsAvailable.economy+flights.seatsAvailable.business+flights.seatsAvailable.first}</td>
                    <td className="border-2 px-4 py-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gray-200 p-1 rounded">{flights.prices.economy}</div>
                        <div className="bg-gray-200 p-1 rounded">{flights.prices.business}</div>
                        <div className="bg-gray-200 p-1 rounded">{flights.prices.first}</div>
                      </div>
                    </td>
                    {/* <td className="border-2">1000</td>
                    <td className="border-2">8000</td>
                    <td className="border-2">5000</td> */}
                    <td className="border-2 px-4 py-2">
                      <div className="flex gap-1 justify-center">
                        {getStatus(flights.departureTime, flights.arrivalTime) === "Yet to Depart" ? (
                          <>
                          <button type="button" className="font-bold focus:outline-none w-20 text-white bg-[#bf2ad3] hover:bg-[#821d90] focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 m-2 mr-0">
                            Edit
                          </button>
                          <button type="button" className="font-bold focus:outline-none w-32 text-white bg-[#0ed485] hover:bg-[#0a8f5a] focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 m-2 ml-1 mr-1">
                            Re-Schedule
                          </button>
                          <button type="button" className="font-bold focus:outline-none w-32 text-white bg-red-600 hover:bg-[#970303] focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 m-2 ml-0 mr-1">
                            Remove
                          </button>
                          </>
                        ):(
                          <div className={`font-bold w-20 bg-[#65a0ff] text-white rounded-lg text-sm px-2.5 py-2.5 m-2 ml-1 mr-1 ${getStatus(flights.departureTime, flights.arrivalTime) === 'Arrived' ? 'bg-[#3aa228]' : (getStatus(flights.departureTime, flights.arrivalTime) === 'In Flight' ? 'bg-yellow-500' : 'bg-red-700')}`}>
                            {getStatus(flights.departureTime, flights.arrivalTime)}
                          </div>
                        )}
                        {/* <button className="bg-[#65a0ff] px-2 py-0.5 rounded-md text-white cursor-pointer">
                          View
                        </button> */}
                        <Link to='/admin/passlist' state={{flightName: flights.flightName, flightNumber: flights.flightNumber, departureTime: flights.departureTime, arrivalTime: flights.arrivalTime, originAirport: flights.originAirport, destinationAirport: flights.destinationAirport}}>
                        <button type="button" className="font-bold focus:outline-none w-20 text-white bg-[#1f82ac] hover:bg-[#155a78] focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2 ml-0">
                          View
                        </button>
                        </Link>
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
}

export default Update;
