import React, { useEffect, useState } from 'react'
import AdminMenu from '../components/AdminMenu'
import AdminNav from '../components/AdminNav'
import { useLocation } from 'react-router-dom'

const PassList = () => {
  const [passList, setPassList] = useState([]);
  const location = useLocation();
  const data = location.state || {};
  console.log(data);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const response = await fetch('http://localhost:3000/bookings');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const pass = await response.json();
        const filterData = pass.filter(list => list.data.flightNumber === data.flightNumber && list.data.departureTime === data.departureTime)
        console.log(filterData);
        setPassList(filterData);

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPassengerData();
    const intervalId = setInterval(fetchPassengerData, 1000);
    return () => clearInterval(intervalId);
  }, []);

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

  let Counter = 1;

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-[70vw] min-h-[220px] p-4 mt-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl text-gray-500 font-semibold">Passenger List</h1>
            <div className="flex items-center">
              <button type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">
                <i className="fa-solid fa-file-export pr-2"></i>
                EXPORT
              </button>
            </div>
          </div>
          <div className='mb-4'>
          <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '50%', textAlign: 'left' }}>
                <tbody>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Flight No</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{data.flightNumber}</td>
                    </tr>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Airline Name</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{data.flightName}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Departure Date & Time</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(formatDateTime(data.departureTime)[0])} | {formatDateTime(data.departureTime)[1]}</td>
                    </tr>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Arrival Date & Time</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{formatDate(formatDateTime(data.arrivalTime)[0])} | {formatDateTime(data.arrivalTime)[1]}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Source</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{data.originAirport}</td>
                    </tr>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Destination</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{data.destinationAirport}</td>
                    </tr>
                </tbody>
            </table>
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
                (You can search passenger details using pid)
              </span>
            </div>
          </div> */}
          <div>
            <table className="table-auto border-collapse border border-slate-500 min-w-full">
              <tr className="even:bg-gray-100">
                <th className="border border-slate-600 px-4 py-2">#</th>
                <th className="border border-slate-600 px-4 py-2">NAME</th>
                <th className="border border-slate-600 px-4 py-2">DATE OF BIRTH</th>
                <th className="border border-slate-600 px-4 py-2">GENDER</th>
                <th className="border border-slate-600 px-4 py-2">MOBILE NO</th>
                <th className="border border-slate-600 px-4 py-2">SEAT TYPE</th>
              </tr>
              {passList.map((details, index) => (
                <React.Fragment key={index}>
                  {details.formData.map((booking, count) => {
                    const Row = Counter++;
                    return (
                    <tr className="even:bg-zinc-300">
                      <td className="border border-slate-600 text-center">{Row}</td>
                      <td className="border border-slate-600 text-center">{booking.title}. {booking.firstName} {booking.lastName}</td>
                      <td className="border border-slate-600 text-center">{formatDate(booking.dob)}</td>
                      <td className="border border-slate-600 text-center">{booking.gender}</td>
                      <td className="border border-slate-600 text-center">{booking.mobile}</td>
                      <td className="border border-slate-600 text-center">{details.data.seat}</td>
                    </tr>
                    )})}
                </React.Fragment>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassList
