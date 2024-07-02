import React, { useEffect, useState } from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";


function Bookings() {
  // const [passengerData, setPassengerData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  // useEffect(() => {
  //   const fetchPassengerData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/bookings');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       setPassengerData(data);

  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchPassengerData();
  // }, []);

  useEffect(() => {
      const fetchBookingData = async () => {
        try {
          const response = await fetch('http://localhost:3000/bookings');
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);
          setBookingData(data);
  
        } catch (error) {
          console.error(error.message);
        }
      };
  
      fetchBookingData();

      const intervalId = setInterval(fetchBookingData, 1000);
      return () => clearInterval(intervalId);
    }, []);

    
  // let Counter = 1;

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

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-[70vw] min-h-[220px] p-4 mt-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl text-gray-500 font-semibold">Bookings</h1>
            <div className="flex items-center">
              {/* <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
                type="button">
                Dropdown button{""}
                <svg
                  class="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> 
                      All Data
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div> */}
              <button type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">
                <i className="fa-solid fa-file-export pr-2"></i>
                EXPORT
              </button>
            </div>
          </div>
          <div>
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
          </div>
          <div>
            <table className="table-auto border-collapse border border-slate-500 min-w-full">
              <tr className="even:bg-gray-100">
                <th className="border border-slate-600 px-4 py-2">#</th>
                <th className="border border-slate-600 px-4 py-2">EMAIL</th>
                <th className="border border-slate-600 px-4 py-2">FLIGHT NO</th>
                <th className="border border-slate-600 px-4 py-2">BOOKED ON</th>
                <th className="border border-slate-600 px-4 py-2">PASSENGER(S)</th>
                <th className="border border-slate-600 px-4 py-2">COST PAID</th>
                <th className="border border-slate-600 px-4 py-2">SEAT TYPE</th>
                <th className="border border-slate-600 px-4 py-2">PASS INFO</th>
              </tr>
              {bookingData.map((booking, index) => (
                <tr className="even:bg-zinc-300">
                  <td className="border border-slate-600 text-center px-4 py-2">{index+1}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">{booking.email}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">{booking.data.flightNumber}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">{formatDate(formatDateTime(booking.time)[0])} {formatDateTime(booking.time)[1]}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">{booking.data.passengers}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">{booking.data.price*booking.data.passengers}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">{booking.data.seat}</td>
                  <td className="border border-slate-600 text-center px-4 py-2">
                  <Link to='/admin/passinfo' state={{data: booking.data, formData: booking.formData}}><button type="button" className="font-bold focus:outline-none w-20 text-white bg-[#1f82ac] hover:bg-[#155a78] focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 m-2 mr-1">
                    View
                  </button></Link>
                  </td>
                </tr>
              ))}
              {/* {passengerData.map((details, index) => (
                <React.Fragment key={index}>
                  {details.formData.map((booking, count) => {
                    const Row = Counter++;
                    return (
                    <tr className="even:bg-zinc-300">
                      <td className="border border-slate-600 text-center">{Row}</td>
                      <td className="border border-slate-600 text-center">{booking.title}. {booking.firstName} {booking.lastName}</td>
                      <td className="border border-slate-600 text-center">{booking.mobile}</td>
                      <td className="border border-slate-600 text-center">{booking.dob}</td>
                      <td className="border border-slate-600 text-center">{booking.gender}</td>
                      <td className="border border-slate-600 text-center">{details.data.flightNumber}</td>
                      <td className="border border-slate-600 text-center">{details.data.originAirport} -&gt; {details.data.destinationAirport}</td>
                      <td className="border border-slate-600 text-center">{details.data.selectedDate}</td>
                    </tr>
                    )})}
                </React.Fragment>
              ))} */}
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
