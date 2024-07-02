import React, { useEffect, useState } from 'react'
import NavbarL from '../components/NavbarL'
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const FlightStatus = ({user, setUser}) => {

    const location = useLocation();
    const data = location.state || {};
    const [flights, setFlights] = useState([]);

    console.log(data);

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
    <>
    <NavbarL user={user} setUser={setUser}/>
    <div className='min-h-[89.2vh] flex flex-col items-center bg-slate-100'>
      <div className='font-semibold text-4xl mb-2 pt-6'>Flight Status</div>
      <div className='text-gray-800 text-xl font-medium'>{data.originAirport} TO {data.destinationAirport}</div>
      <p className='mb-4 text-gray-800 text-xl font-medium'>{formatDate(data.selectedDate)}</p>
      {flights.length === 0 ?
      (<div className="text-center text-gray-600">No flights available</div>
      ) : (
        flights.map((flight, index) => (
            <div key={index} className='flex flex-wrap justify-center mb-4'>
                <div className="h-[180px] w-full md:w-[50vw] flex mb-4 px-8 items-center rounded-[12px] shadow-lg justify-evenly bg-white">
                <div className="flight-status-card flex flex-col align-items-center">
                    <h1 className="font-bold text-2xl">{flight.originAirport}</h1>
                    <p className="text-neutral-800">DEPARTURE</p>
                    <h1 className="font-semibold text-4xl">{formatDateTime(flight.departureTime)[1]}</h1>
                    <p className="text-neutral-800">{formatDate(formatDateTime(flight.departureTime)[0])}</p>
                </div>
                <div className='flex items-center relative'>
                    <div className='flex items-center'><div className='rounded-full bg-[#41cd41] h-[15px] w-[15px]'></div><div className='h-[2px] w-[30vw] bg-[#41cd41]'></div><img src='/airplane.png' className='h-10'></img></div>
                </div>
                <div className="flight-status-card flex flex-col align-items-center">
                    <h1 className="font-bold text-2xl">{flight.destinationAirport}</h1>
                    <p className="text-neutral-800">ARRIVAL</p>
                    <h1 className="font-semibold text-4xl">{formatDateTime(flight.arrivalTime)[1]}</h1>
                    <p className="text-neutral-800">{formatDate(formatDateTime(flight.arrivalTime)[0])}</p>
                </div>
                </div>
                <div className="h-[180px] w-full md:w-[15vw] bg-white min-w-[203.038px] shadow-lg flex flex-col justify-center items-center rounded-[12px] relative mt-4 md:mt-0">
                <div className={`h-[35px] w-[10vw] min-w-[102px] ${getStatus(flight.departureTime, flight.arrivalTime) === 'Arrived' ? 'bg-green-700' : (getStatus(flight.departureTime, flight.arrivalTime) === 'In Flight' ? 'bg-yellow-500' : 'bg-red-700')} text-white right-[0px] top-[10px] rounded-l-lg font-semibold flex justify-center items-center absolute`}>
                  {getStatus(flight.departureTime, flight.arrivalTime)}
                </div>
                <p className='font-bold text-xl'>{flight.flightName}</p>
                <p className='font-bold text-xl'>{flight.flightNumber}</p>
                </div>
            </div>
        )))}
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default FlightStatus;
