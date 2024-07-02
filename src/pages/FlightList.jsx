import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarL from '../components/NavbarL';
import Footer from '../components/Footer';

const FlightList = ({user, setUser}) => {
  const location = useLocation();
  const data = location.state || {};
  const [flights, setFlights] = useState([]);
  
  const formatDateTime = (dateTimeString) => {
    if (typeof dateTimeString !== 'string')
    return "Invalid Date";
    const [datePart, timePart] = dateTimeString.split('T');
    // const [year, month, day] = datePart.split('-');
    // const [hours, minutes] = timePart.split(':');
    // const formattedDate = `${day}-${month}-${year}`;
    // const formattedTime = `${hours}:${minutes}`;
    return [datePart, timePart];
  };

  const formatDate = (date) => {
    if (typeof date !== 'string')
    return "Invalid Date";
    const [year, month, day] = date.split('-');
    // const [hours, minutes] = timePart.split(':');
    const formattedDate = `${day}-${month}-${year}`;
    // const formattedTime = `${hours}:${minutes}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchFlights = async () => {
        const response = await fetch('http://localhost:3000/api/flights');
        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }
        const flightsData = await response.json();
        const filteredFlights = flightsData.filter(flight =>
          flight.originAirport === data.originAirport &&
          flight.destinationAirport === data.destinationAirport
        );
        
        const flightsWithDetails = [];
        for (const flight_ of filteredFlights) {
          const detailsResponse = await fetch('http://localhost:3000/api/flightinfo');
          if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            const flightDetails = detailsData.filter(flight =>
              flight.flightNumber === flight_.flightNumber &&
              formatDateTime(flight.departureTime)[0] === data.selectedDate.toString()
              );
            if(flightDetails.length > 0)
            {
              flightsWithDetails.push({
                ...flight_,
                prices: flightDetails[0].prices,
                seatsAvailable: flightDetails[0].seatsAvailable,
                // selectedDate: flightDetails[0].departureDate,
                departureTime: flightDetails[0].departureTime,
                arrivalTime: flightDetails[0].arrivalTime

              });
            }
          }
        }
        console.log(flightsWithDetails);
        setFlights(flightsWithDetails);
        // console.log(data.selectedDate.toString());
        // setFlights(filteredFlights);
    };

    fetchFlights();
  }, [data.originAirport, data.destinationAirport, data.flightNumber, data.selectedDate ]);

  const timeDifference = (startTime, endTime) => {
    // Parse the input timestamps
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate the difference in milliseconds
    const diffMs = end - start;
    // console.log("diff"+diffMs);

    // Calculate the difference in hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    // Format the result
    let result = "";
    if(diffMinutes !== 0)
    result = `${diffHours.toString().padStart(2, '0')}h ${diffMinutes.toString().padStart(2, '0')}m`;
    else
    result = `${diffHours.toString().padStart(2, '0')}h`;
    return result;
}

  return (
    <>
    <NavbarL user={user} setUser={setUser}/>
    <div className="flight-listing-container max-w-5xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Flights from {data.originAirport} to {data.destinationAirport} on {formatDate(data.selectedDate)}
      </h2>
      {flights.length === 0 ? (
        <div className="text-center text-gray-600">No flights available</div>
      ) : (
      flights.map((flight, index) => (
        <div key={index} className="flight-card p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col mb-4">
            <h1 className="text-xl font-bold">
              {flight.flightName}
            </h1>
            <h1 className="text-lg text-gray-600 font-bold">
              {flight.flightNumber}
            </h1>
            <div className="flex justify-between items-center mt-6">
              {/* <div className="flex-1 text-center">
                <p className="text-gray-600">{flight.duration}</p>
              </div> */}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-lg">{flight.originAirport}</p>
                <p className="text-gray-600">{formatDateTime(flight.departureTime)[1]}</p>
                <p className="text-gray-600">{formatDate(formatDateTime(flight.departureTime)[0])}</p>
              </div>
              <div className="relative flex items-center flex-1 mx-4">
                <div className="flex-1 border-t border-gray-300 relative" style={{ top: '-0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}></div>
                <p className="mx-4 text-center relative" style={{ top: '-0.75rem' }}>{timeDifference(flight.departureTime, flight.arrivalTime)}</p>
                <div className="flex-1 border-t border-gray-300 relative" style={{ top: '-0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}></div>
              </div>
              <div className="text-center">
                <p className="text-lg">{flight.destinationAirport}</p>
                <p className="text-gray-600">{formatDateTime(flight.arrivalTime)[1]}</p>
                <p className="text-gray-600">{formatDate(formatDateTime(flight.arrivalTime)[0])}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="class-card p-4 bg-white rounded-lg shadow-md">
              <h4 className="font-bold">Economy</h4>
              {flight.seatsAvailable.economy !== -1 ? (
                <>
                <p>Price: {flight.prices.economy}</p>
                <p>Seats Available: {flight.seatsAvailable.economy}</p>
                {user ? (
                    <Link to='/passform' state={{originAirport: data.originAirport, destinationAirport: data.destinationAirport, passengers: data.passengers, price: flight.prices.economy, flightNumber: flight.flightNumber, flightName: flight.flightName, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, seat: "Economy" }}>
                    <button className="select-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                      Select
                    </button></Link>
                ):(
                  <button disabled className="select-button disabled:opacity-50 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                      Select
                  </button>
                )}
                </>
              ):(
                <div className='text-red-600 font-bold text-xl flex justify-center items-center h-full pb-8'>Class not Available</div>   
              )}
            </div>
            <div className="class-card p-4 bg-white rounded-lg shadow-md">
              <h4 className="font-bold">Business</h4>
              {flight.seatsAvailable.business !== -1 ? (
                <>
                <p>Price: {flight.prices.business}</p>
                <p>Seats Available: {flight.seatsAvailable.business}</p>
                {user ? (
                  <Link to='/passform' state={{originAirport: data.originAirport, destinationAirport: data.destinationAirport, passengers: data.passengers, price: flight.prices.business, flightNumber: flight.flightNumber, flightName: flight.flightName, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, seat: "Business" }}>
                  <button className="select-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Select
                  </button></Link>
                ):(
                  <button disabled className="select-button w-full disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Select
                  </button>
                )}
                </>
              ):(
                <div className='text-red-600 font-bold text-xl flex justify-center items-center h-full pb-8'>Class not Available</div>
              )}
            </div>
            <div className="class-card p-4 bg-white rounded-lg shadow-md">
              <h4 className="font-bold">First Class</h4>
              {flight.seatsAvailable.first !== -1 ? (
                <>
                <p>Price: {flight.prices.first}</p>
                <p>Seats Available: {flight.seatsAvailable.first}</p>
                {user ? (
                  <Link to='/passform' state={{originAirport: data.originAirport, destinationAirport: data.destinationAirport, passengers: data.passengers, price: flight.prices.first, flightNumber: flight.flightNumber, flightName: flight.flightName, departureTime: flight.departureTime, arrivalTime: flight.arrivalTime, seat: "First" }}>
                  <button className="select-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Select
                  </button></Link>
                ):(
                  <button disabled className="select-button w-full disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Select
                  </button>
                )}
                </>
              ):(
                <div className='text-red-600 font-bold text-xl flex justify-center items-center h-full pb-8'>Class not Available</div>
              )}
              
            </div>
          </div>
        </div>
      )))}
    </div>
    {/* <Footer/> */}
    </>
  );
}

export default FlightList;
