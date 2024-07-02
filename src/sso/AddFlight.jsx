import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

function AddFlight() {

  // const [economyChecked, setEconomyChecked] = useState(false);
  // const [businessChecked, setBusinessChecked] = useState(false);
  // const [firstChecked, setFirstChecked] = useState(false);
  // const [flightNames, setFlightNames] = useState([]);
  // const [flightName, setFlightName] = useState(null);
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [flightNumber, setFlightNumber] = useState(null);
  const [airports, setAirports] = useState([]);
  const [originAirport, setOriginAirport] = useState('NULL');
  const [destinationAirport, setDestinationAirport] = useState('NULL');
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const [departureDate, setDepartureDate] = useState('');
  // const [economy, setEconomy] = useState(0);
  // const [business, setBusiness] = useState(0);
  // const [first, setFirst] = useState(0);
  // const [economyCost, setEconomyCost] = useState(0);
  // const [businessCost, setBusinessCost] = useState(0);
  // const [firstCost, setFirstCost] = useState(0);
  
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state || {};
  console.log(data);

  useEffect(() => {
    fetch('http://localhost:3000/api/airports')
      .then(response => response.json())
      .then(data => {
        const Filter = data.filter(airport => airport.code !== destinationAirport);
        setAirports(Filter);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [destinationAirport]);

  useEffect(() => {
    fetch('http://localhost:3000/api/airports')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(airport => airport.code !== originAirport);
        setFilteredAirports(filtered);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [originAirport]);


  // const handleEco = event => {
  //   setEconomy(event.target.value);
  // };
  // const handleBus = event => {
  //   setBusiness(event.target.value);
  // };
  // const handleFirst = event => {
  //   setFirst(event.target.value);
  // };
  // const handleEcoCost = event => {
  //   setEconomyCost(event.target.value);
  // };
  // const handleBusCost = event => {
  //   setBusinessCost(event.target.value);
  // };
  // const handleFirstCost = event => {
  //   setFirstCost(event.target.value);
  // };


  // useEffect(() => {
  //   const fetchFlightNames = async () => {
  //           const response = await fetch('http://localhost:3000/api/flights');
  //           if (!response.ok) {
  //               throw new Error('Network response was not ok ' + response.statusText);
  //           }
  //           const flights = await response.json();
  //           const names = flights.map(flight => flight.flightName);
  //           const uniqueNames = [...new Set(names)];
  //           console.log(uniqueNames);
  //           setFlightNames(uniqueNames);
  //     };
  //     fetchFlightNames();
  //   }, []);

    // const handleChange = event => {
    //   setFlightName(event.target.value);
    // };
    
    const handleChange_ = event => {
      if(event.target.value >= 0 && event.target.value <= 9999)
      setFlightNumber(event.target.value);
    };

    const handleChange_D = event => {
      setDestinationAirport(event.target.value);
    };
    
    const handleChange = event => {
      setOriginAirport(event.target.value);
    };

    useEffect(() => {
      if (data.flights.includes(`${data.flightCode+" "+flightNumber}`)) {
        setErrorMessage('Flight number already exists !');
      } else {
        setErrorMessage('');
      }
    }, [flightNumber, data.flights]);
    // const handleChangeDate = async (event) => {
    //   setDepartureDate(event.target.value);
    // };

    // console.log(flightName);
  //   useEffect(() => {
  //     if (flightName) {
  //         const fetchFlightNumbers = async () => {
  //             const response = await fetch('http://localhost:3000/api/flights');
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok ' + response.statusText);
  //             }

  //             const flights = await response.json();
  //             const filteredFlights = flights.filter(flight => flight.flightName === flightName);
  //             const flightNumbers = filteredFlights.map(flight => flight.flightNumber);
  //             setFlightNumbers(flightNumbers);
  //             console.log(flightNumbers);
  //         };

  //         fetchFlightNumbers();
  //     }
  // }, [flightName]);
// useEffect(() => {
//     const checkFlightSchedule = async () => {
//           const response = await fetch('http://localhost:3000/api/flightinfo');
//           if (!response.ok) {
//               throw new Error('Network response was not ok ' + response.statusText);
//           }
    
//           const flights = await response.json();
//           const filteredFlights = flights.filter(flight => flight.flightNumber === flightNumber && flight.departureDate === departureDate);
//           console.log(filteredFlights);
//           // console.log(flights);
//           if (filteredFlights.length > 0) {
//               alert('This flight is already scheduled on the selected departure date.');
//               setDepartureDate('');
//           }
//           else
//           setDepartureDate(departureDate);
//     };

//     checkFlightSchedule();
// }, [departureDate]);


const handleSubmit = async (e) => {
    e.preventDefault();
    // const seatsAvailable = {
    //   economy,
    //   business,
    //   first
    // }
    // const prices = {
    //   economy: economyCost,
    //   business: businessCost,
    //   first: firstCost
    // }
    const flightdata = {
      flightName: data.flightName,
      flightNumber: `${data.flightCode} ${flightNumber}`,
      originAirport,
      destinationAirport
    }
    
    const code = {
      flightCode: data.flightCode,
      flightNumber: `${data.flightCode} ${flightNumber}`
    }

    console.log(flightdata);
      const response = await fetch('http://localhost:3000/api/airlines-addflt', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(code),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }

      const res = await fetch("http://localhost:3000/api/flights", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(flightdata),
      });
      navigate('/admin/airlinemanagement');
}; 


  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-[80vw] h-[36rem] bg-white relative rounded-xl shadow-lg p-6 pt-8 mt-6">
          <div className="flex justify-between">
            <div className="text-3xl font-semibold text-slate-600">
              ADD A FLIGHT
            </div>
            <Link to="/admin/fltmanagement">
              <button className="bg-[#ffc637] px-5 py-2 rounded-md font-bold flex items-center cursor-pointer">
              <i className="fa-solid fa-plane pr-2 rotate-[-45deg] mb-1"></i>
                <span className="ml-1">VIEW FLIGHT(S)</span>
              </button>
            </Link>
          </div>
          <form className="mt-12 relative w-[80vw]">
                    <div className="bg-slate-100 p-4">
                        <label for='airlines' className="text-xl font-medium">Selected Airline</label>
                        <input name='airlines' id='airlines' value={data.flightName} disabled className="absolute left-1/2 border border-slate-500 h-8 pl-2"/>
                    </div>
                    <div className="p-4 flex">
                        <label for='flightNo' className="text-xl font-medium">Enter Flight Number</label>
                        <div className="relative left-[31.4%]">
                          <input name='flightNo' id='flightNo' value={data.flightCode} disabled className="border border-slate-500 h-8 pl-2 w-10"/>
                          <input type='number' name='flightNo' id='flightNo' value={flightNumber} onChange={handleChange_} className="border border-slate-500 h-8 pl-2 w-[9.4rem]"/>
                          {errorMessage ? (<div className="text-red-500 text-sm font-bold flex justify-center items-center gap-1 mt-1"><img src="https://cdn-icons-png.flaticon.com/512/16208/16208197.png" alt="" className="h-5 w-5" /> {errorMessage}</div>) : (flightNumber && <div className="text-green-700 text-sm font-bold flex justify-center items-center gap-1 mt-1"><img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png " className="h-5 w-5"></img> Flight number is valid !</div>)}
                        </div>
                    </div>
                    <div className="p-4 flex items-center bg-slate-100">
                      <label for="origin" className="text-xl font-medium">
                        Select Origin Airport
                      </label>
                      <select type="dropdown" name="origin" id="origin" required value={originAirport} onChange={handleChange} className="absolute left-1/2 border border-slate-500 h-8 pl-1"> {/*w-48 */}
                        <option value="NULL" key="NULL">Select Origin</option>
                        {airports.map(airport => (
                          <option key={airport.code} value={airport.code}>
                            {airport.name} - {airport.country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="p-4 flex items-center">
                      <label for="dest" className="text-xl font-medium">
                        Select Destination Airport
                      </label>
                      <select type="dropdown" name="dest" id="dest" required value={destinationAirport} onChange={handleChange_D} className="absolute left-1/2 border border-slate-500 h-8 pl-1">
                        <option value="NULL" key="NULL">Select Destination</option>
                        {filteredAirports.map(airport => (
                          <option key={airport.code} value={airport.code}>
                            {airport.name} - {airport.country}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div className='p-4 bg-slate-100'>
                        <label for="appointment" className="text-xl font-medium">Choose Date Of Departure</label>
                        <input type="date" id="appointment" name="appointment" value={departureDate} disabled={!flightNumber} onChange={handleChangeDate} required className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div> */}
                    {/* <div className="p-4 flex">
                        <label for='flightNo' className="text-xl font-medium">Flight Has</label>
                        <div className="flex gap-5 text-lg absolute left-1/2">
                            <label for="economy">
                                <input type="checkbox" name="economy" id="economy" disabled={!departureDate} checked={economyChecked} onChange={() => setEconomyChecked(!economyChecked)}/>
                                Economy Class
                            </label>
                            <label for="business">
                                <input type="checkbox" name="business" id="business" disabled={!departureDate} checked={businessChecked} onChange={() => setBusinessChecked(!businessChecked)}/>
                                Business Class
                            </label>
                            <label for="first">
                                <input type="checkbox" name="first" id="first" disabled={!departureDate} checked={firstChecked} onChange={() => setFirstChecked(!firstChecked)}/>
                                First Class
                            </label>
                        </div>
                    </div> */}
                    
                    {/* <div className='p-4 bg-slate-100'>
                        <label for='economyNo' className="text-xl font-medium">Enter Number Of Economy Class Seats</label>
                        <input type="number" name='economyNo' id='economyNo' min="1" step="1" defaultValue={1} required disabled={!economyChecked} value={economy} onChange={handleEco} className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div>
                    <div className='p-4'>
                        <label for='businessNo' className="text-xl font-medium">Enter Number Of Business Class Seats</label>
                        <input type="number" name='businessNo' id='businessNo' min="1" step="1" defaultValue={1} required disabled={!businessChecked} value={business} onChange={handleBus} className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div>
                    <div className='p-4 bg-slate-100'>
                        <label for='firstNo' className="text-xl font-medium">Enter Number Of First Class Seats</label>
                        <input type="number" name='firstNo' id='firstNo' min="1" step="1" defaultValue={1} required disabled={!firstChecked} value={first} onChange={handleFirst} className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div> */}
                    {/* <div className='p-4'>
                        <label for='economyCost' className="text-xl font-medium">Enter Cost Of Economy Class Seat</label>
                        <input type="number" name='economyCost' id='economyCost' min="1" step="1" defaultValue={1} required disabled={!economyChecked} value={economyCost} onChange={handleEcoCost} className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div>
                    <div className='p-4 bg-slate-100'>
                        <label for='businessCost' className="text-xl font-medium">Enter Cost Of Business Class Seat</label>
                        <input type="number" name='businessCost' id='businessCost' min="1" step="1" defaultValue={1} required disabled={!businessChecked} value={businessCost} onChange={handleBusCost} className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div>
                    <div className='p-4'>
                        <label for='firstCost' className="text-xl font-medium">Enter Cost Of First Class Seat</label>
                        <input type="number" name='firstCost' id='firstCost' min="1" step="1" defaultValue={1} required disabled={!firstChecked} value={firstCost} onChange={handleFirstCost} className="border border-slate-500 absolute left-1/2 h-8"></input>
                    </div> */}
                    <div className="flex gap-20 justify-center mt-10">
                        <button type='submit' onClick={handleSubmit} className="bg-[#585eff] w-20 h-10 rounded-md text-white font-semibold disabled:opacity-50" disabled={errorMessage || !flightNumber || originAirport == "NULL" || destinationAirport == "NULL"}>Submit</button>
                        <button type='reset' className="bg-[#ee3333] w-20 h-10 rounded-md text-white font-semibold">Reset</button>
                    </div>
                </form>
        </div>
      </div>
    </div>
  );
}

export default AddFlight;
