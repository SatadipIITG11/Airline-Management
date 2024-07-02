import React, { useState, useEffect } from 'react';
import NavbarM from '../components/NavbarM';
import { useLocation, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const MyFlights = ({user}) => {
  const [flights, setFlights] = useState([]);
  const location = useLocation();
  const data = location.state || {};

  useEffect(() => {
    const fetchFlights = async () => {
        const response = await fetch('http://localhost:3000/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const flightsData = await response.json();
        const filteredFlights = flightsData.filter(flight =>
          flight.email === data.email
        );
        
        setFlights(filteredFlights);
        console.log(filteredFlights);
    };

    fetchFlights();
  }, []);

  const handleCancel = (flight) => {
    alert(`Flight ${flight} has been canceled.`);
  };

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

  return (
    <>
      <NavbarM user={user}/>
      <div className='bg-[#F7F6FF] mt- '>
        <h2 className='text-center text-4xl font-medium pt-6 pb-3'>My Flights</h2>
        <div className='flex justify-center mt-5'>
          <div className='bg-white w-3/4 rounded-3xl px-8 py-4 drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]'>
            {flights.map((flight, index) => (
              <div key={index} className="flight-details bg-white rounded-xl shadow-lg p-4 mb-4">
                <div className='flex justify-between items-center'>
                  <div className='text-3xl font-medium'>{flight.data.originAirport}</div>
                  <div className='text-center'>
                    <div className='text-xl font-medium'>{flight.data.flightName}</div>
                    <div className='text-base font-medium'>{flight.data.flightNumber}</div>
                  </div>
                  <div className='text-3xl font-medium'>{flight.data.destinationAirport}</div>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <div className='text-center'>
                    <div className='font-normal'>Departure</div>
                    <div className='text-3xl font-medium'>{formatDateTime(flight.data.departureTime)[1]}</div>
                    <div className='font-normal'>{formatDate(formatDateTime(flight.data.departureTime)[0])}</div>
                  </div>
                  <div className='flex-grow relative mx-4'>
                    <span className='bg-[#00c800] h-1 w-full absolute top-1/2 transform -translate-y-1/2'></span>
                    <span className='bg-[#00c800] h-4 w-4 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2'></span>
                    <img src="/airplane.png" className='h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' alt="Airplane" />
                    <span className='bg-[#00c800] h-4 w-4 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2'></span>
                  </div>
                  <div className='text-center'>
                    <div className='font-normal'>Arrival</div>
                    <div className='text-3xl font-medium'>{formatDateTime(flight.data.arrivalTime)[1]}</div>
                    <div className='font-normal'>{formatDate(formatDateTime(flight.data.arrivalTime)[0])}</div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Link to='/eticket_' state={{data: flight}}><button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 text-lg"
                
                  >
                    Print
                  </button></Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg"
                    onClick={() => handleCancel(`${flight.airline} ${flight.flightNumber}`)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default MyFlights;
