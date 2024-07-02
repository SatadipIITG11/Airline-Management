import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

const ViewFlights = () => {
    const location = useLocation();
    const data = location.state || {};
    console.log(data);
    const [flights, setFlights] = useState([]);
    const [flightName, setFlightName] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/airlines');
                const flights = await response.json();
                const filteredFlights = flights.filter((flight)=>flight.flightCode === data.flightCode);
                setFlights(filteredFlights[0].flights);
                setFlightName(filteredFlights[0].flightName);
                console.log(filteredFlights[0].flights);

                if (filteredFlights.length > 0) {
                  const flightDetails = [];
                  
                  for (const flightNo of filteredFlights[0].flights) {
                      const flightDetailsResponse = await fetch(`http://localhost:3000/api/flights`);
                      const flightDetailsData = await flightDetailsResponse.json();
                      const filteredFlightsWithDetails = flightDetailsData.filter((flight)=>flight.flightNumber === flightNo);
                      flightDetails.push(filteredFlightsWithDetails[0]);
                  }
              
                  console.log(flightDetails);
                  setFlights(flightDetails);
                }

            } catch (error) {
                setError('Error fetching data');
                setFlights([]);
            }
        };
        fetchFlights();
    }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu/>
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav/>
        <div className="w-[70vw] min-h-[220px] p-4 mt-20 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl text-gray-500 font-semibold">
              Available Flights
            </h1>
            <Link to="/admin/airlinemanagement">
              <button
                type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                <i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
                VIEW AIRLINE(s)
              </button></Link>
          </div>
          <div className="pb-6">
            <div className="font-bold text-xl">Airline Name : {flightName}</div>
            <div className="font-bold text-xl">Airline Code : {data.flightCode}</div>
          </div>
          <div className="list">
            <table className="table-auto border-collapse border border-slate-500 min-w-full">
                <tr className="even:bg-gray-100">
                    <th className="border border-slate-600">FLIGHT NO</th>
                    <th className="border border-slate-600">ORIGIN AIRPORT</th>
                    <th className="border border-slate-600">DESTINATION</th>
                    <th className="border border-slate-600">ADDED ON</th>
                </tr>
                {flights.map((flight, index) =>
                    <tr key={index} className="even:bg-zinc-300">
                        <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flight.flightNumber}</td>
                        <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flight.originAirport}</td>
                        <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flight.destinationAirport}</td>
                        {/* <td className="border border-slate-600 text-center px-4 py-2 font-bold">{flight.destinationAirport}</td> */}
                    </tr>
                )}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewFlights
