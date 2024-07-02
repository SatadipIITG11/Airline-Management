import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";

function Schedule() {

  const [departureTime,setDepartureTime]=useState("");
  const [arrivalTime,setArrivalTime]=useState("");
  const [duration,setDuration]=useState("");
  const [economyChecked, setEconomyChecked] = useState(false);
  const [businessChecked, setBusinessChecked] = useState(false);
  const [firstChecked, setFirstChecked] = useState(false);
  const [economy, setEconomy] = useState(0);
  const [business, setBusiness] = useState(0);
  const [first, setFirst] = useState(0);
  const [economyCost, setEconomyCost] = useState(0);
  const [businessCost, setBusinessCost] = useState(0);
  const [firstCost, setFirstCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const data = location.state || {};
  console.log(data);

  const navigate = useNavigate();

  function timeDifference(startTime, endTime) {
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
    const result = `${diffHours.toString().padStart(2, '0')}h ${diffMinutes.toString().padStart(2, '0')}m`;

    return result;
}

useEffect(() => {
  if (arrivalTime && departureTime >= arrivalTime) {
    setErrorMessage("Arrival time cannot precede departure time");
  } else {
    setErrorMessage("");
  }
}, [departureTime, arrivalTime]);

// useEffect(() => {
//   if (departureTime && arrivalTime <= departureTime) {
//     setErrorMessage("Arrival time cannot precede departure time");
//   } else {
//     setErrorMessage("");
//   }
// }, [departureTime, arrivalTime]);

  const handleDeparture=(e)=>{
      console.log(e.target.value)
      setDepartureTime(e.target.value);
      // console.log("departure "+departureTime)
      if(departureTime && arrivalTime)
      {
        setDuration(timeDifference(departureTime, arrivalTime));
        // console.log("duration1 "+duration)
      }
      
  }
  const handleArrival=(e)=>{
    setArrivalTime(e.target.value);
    // console.log("arrival "+arrivalTime)
    if(departureTime && arrivalTime)
    {
      setDuration(timeDifference(departureTime, arrivalTime));
      // console.log("duration2 "+duration)
    }
    
  }
  useEffect(() => {

    if(departureTime && arrivalTime)
      {
        setDuration(timeDifference(departureTime, arrivalTime));
        // console.log("durationNew "+duration)
      }
    
  }, [departureTime,arrivalTime,duration]);
  
  useEffect(() => {
    if (!economyChecked) {
      setEconomy(-1);
      setEconomyCost(0);
    }
    else {
      setEconomy((prev) => {
        const prevString = prev.toString();
        return prevString.slice(0, -2);
      });
      setEconomyCost((prev) => {
        const prevString = prev.toString();
        return prevString.slice(0, -1);
      });
    }
  }, [economyChecked]);

  useEffect(() => {
    if (!businessChecked) {
      setBusiness(-1);
      setBusinessCost(0);
    }
    else {
      setBusiness((prev) => {
        const prevString = prev.toString();
        return prevString.slice(0, -2);
      });
      setBusinessCost((prev) => {
        const prevString = prev.toString();
        return prevString.slice(0, -1);
      });
    }
  }, [businessChecked]);
  
  useEffect(() => {
    if (!firstChecked) {
      setFirst(-1);
      setFirstCost(0);
    }
    else {
      setFirst((prev) => {
        const prevString = prev.toString();
        return prevString.slice(0, -2);
      });
      setFirstCost((prev) => {
        const prevString = prev.toString();
        return prevString.slice(0, -1);
      });
    }
  }, [firstChecked]);

  const handleEco = (event) => {
    setEconomy(event.target.value);
    // console.log(economy);
  };
  const handleBus = event => {
    setBusiness(event.target.value);
  };
  const handleFirst = event => {
    setFirst(event.target.value);
  };
  const handleEcoCost = (event) => {
    setEconomyCost(event.target.value);
    // console.log(economyCost);
  };
  const handleBusCost = event => {
    setBusinessCost(event.target.value);
  };
  const handleFirstCost = event => {
    setFirstCost(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const seatsAvailable = {
      economy: parseInt(economy),
      business: parseInt(business),
      first: parseInt(first)
    }
    const prices = {
      economy: parseInt(economyCost),
      business: parseInt(businessCost),
      first: parseInt(firstCost)
    }
    const flightdata = {
      flightName: data.flightName,
      flightNumber: data.flightNumber,
      departureTime,
      newdepTime: departureTime,
      arrivalTime,
      newarrTime: arrivalTime,
      seatsAvailable,
      prices
    }
    console.log(flightdata);
    const response = await fetch('http://localhost:3000/api/flightin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightdata),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    navigate('/admin/fltmanagement');
}; 

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-full h-[58rem] bg-white relative rounded-xl shadow-lg p-6 pt-8 mb-2 mt-8">
          <div className="text-3xl font-semibold text-slate-600">
            SCHEDULE A FLIGHT
          </div>
          <div className="mt-3">
            (If flight is already added and you want to update click on{" "}
            <Link to="/UpdateFlight" className="font-semibold text-[#383eff]">
              update flight
            </Link>
            )
          </div>
          <form
            action="/FlightsManagement"
            method="post"
            className="mt-12 relative"
          >
            <div className="bg-slate-100 p-4 flex items-center">
              <label for="airlines" className="text-xl font-medium">
                Selected Airline
              </label>
              {/* <select
                name="airlines"
                id="airlines"
                required
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="Emirates">Emirates</option>
                <option value="Indigo">Indigo</option>
                <option value="AirIndia">AirIndia</option>
                <option value="AirAsia">AirAsia</option>
                <option value="Vistara">Vistara</option>
              </select> */}
              <input name="airlines" id="airlines" value={data.flightName} disabled className="absolute left-1/2 border border-slate-500 h-10 p-2"/>
            </div>
            <div className="p-3 flex items-center">
              <label for="flightNo" className="text-xl font-medium">
                Selected Flight Number
              </label>
              {/* <select
                name="flightNo"
                required
                id="flightNo"
                className="border border-slate-500 absolute left-1/2 h-10"
              >
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
                <option value="105">105</option>
                </select> */}
              <input name="flightNo" id="flightNo" value={data.flightNumber} disabled className="border border-slate-500 absolute left-1/2 h-10 p-2"/>
            </div>
            <div className="bg-slate-100 p-3 flex items-center">
              <label for="source" className="text-xl font-medium">
                Source - Destination
              </label>
              {/* <select
                name="airlines"
                id="source"
                required
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="BOM">Mumbai (BOM)</option>
                <option value="NSK">Nashik (NSK)</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="MAA">Chennai (MAA)</option>
              </select> */}
              <div className="relative left-[28.85%] flex gap-2 justify-center items-center">
                <input name="airlines" id="source" disabled value={data.originAirport} className="border border-slate-500 h-10 w-20 p-2"/>
                <img src="/flight.png" className="h-5 w-5" alt="" />
                <input name="airlines" id="source" disabled value={data.destinationAirport} className="border border-slate-500 h-10 w-20 p-2"/>
              </div>
            </div>
            {/* <div className="p-3 bg-white flex items-center">
              <label for="destination" className="text-xl font-medium">
                Select Destination
              </label>
              <select
                name="destination"
                id="destination"
                required
                className="absolute left-1/2 border border-slate-500 h-10"
              >
                <option value="BOM">Mumbai (BOM)</option>
                <option value="NSK">Nashik (NSK)</option>
                <option value="DEL">Delhi (DEL)</option>
                <option value="HYD">Hyderabad (HYD)</option>
                <option value="MAA">Chennai (MAA)</option>
                </select>
                </div> */}
            <div className=" p-3">
              <label for="departure-time" className="text-xl font-medium">
                Select The Departure Date And Time Of Flight
              </label>
              <input
                type="datetime-local"
                id="departure-time"
                name="departure-time"
                required
                value={departureTime}
                className="absolute left-1/2 px-4 py-2 border border-slate-500 h-8 rounded-md shadow-sm focus:outline-none ml-12"
                onChange={handleDeparture}
              ></input>
            </div>
            <div className="p-3 bg-slate-100">
              <label for="arrival-time" className="text-xl font-medium">
                Select The Arrival Date And Time Of Flight
              </label>
              <input
                type="datetime-local"
                id="arrival-time"
                name="arrival-time"
                required
                className="absolute left-1/2 px-4 py-2 border border-slate-500 h-8 rounded-md shadow-sm focus:outline-none ml-12"
                disabled={!departureTime}
                onChange={handleArrival}
                ></input>
                {errorMessage ? (<div className="relative left-[23%] text-red-500 text-sm font-bold flex justify-center items-center gap-1 mt-2"><img src="https://cdn-icons-png.flaticon.com/512/16208/16208197.png" alt="" className="h-5 w-5" /> {errorMessage}</div>) : <div></div>}
            </div>
          <div className="p-3">
              <label for="flightNo" className="text-xl font-medium">
                Duration
              </label>
              
              <input
                type="text"
                name="flightNo"
                value={duration}
                disabled
                id="flightNo"
                className="border border-slate-500 w-60 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            <div className="bg-slate-100 p-3 flex">
              <label for="flightNo" className="text-xl font-medium">
                Flight Has
              </label>
              <div className="flex gap-5 absolute left-1/2">
                <label for="economy" className='flex items-center'>
                  <input className='mr-1' disabled={!departureTime || !arrivalTime} type="checkbox" checked={economyChecked} onChange={() => setEconomyChecked(!economyChecked)} name="economy" id="economy" />
                  Economy Class
                </label>
                <label for="business" className='flex items-center'>
                  <input className='mr-1' disabled={!departureTime || !arrivalTime} type="checkbox" checked={businessChecked} onChange={() => setBusinessChecked(!businessChecked)} name="business" id="business" />
                  Business Class
                </label>
                <label for="first" className='flex items-center'>
                  <input className='mr-1' disabled={!departureTime || !arrivalTime} type="checkbox" checked={firstChecked} onChange={() => setFirstChecked(!firstChecked)} name="first" id="first" />
                  First Class
                </label>
              </div>
            </div>
            <div className="p-3">
              <label for="economyNo" className="text-xl font-medium">
                Enter Number Of Economy Class Seats
              </label>
              <input
                type="number"
                name="economyNo"
                id="economyNo"
                min="0"
                step="1"
                value={economy}
                disabled={!economyChecked}
                onChange={handleEco}
                className="border border-slate-500 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            <div className="p-3 bg-slate-100">
              <label for="businessNo" className="text-xl font-medium">
                Enter Number Of Business Class Seats
              </label>
              <input
                type="number"
                name="businessNo"
                id="businessNo"
                min="0"
                step="1"
                value={business}
                disabled={!businessChecked}
                onChange={handleBus}
                className="border border-slate-500 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            <div className="p-3">
              <label for="firstNo" className="text-xl font-medium">
                Enter Number Of First Class Seats
              </label>
              <input
                type="number"
                name="firstNo"
                id="firstNo"
                min="0"
                step="1"
                value={first}
                disabled={!firstChecked}
                onChange={handleFirst}
                className="border border-slate-500 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            {/* <div className="bg-slate-100 p-3">
              <label for="arrival-time" className="text-xl font-medium">
                Duration
              </label>
              <input
                type="datetime-local"
                id="arrival-time"
                name="arrival-time"
                min="2023-06-01T00:00"
                max="2023-12-31T23:59"
                step="1800"
                required
                className="absolute left-1/2 px-4 py-2 border border-slate-500 h-8 rounded-md shadow-sm focus:outline-none ml-12"
              ></input>
            </div> */}
            <div className="p-3 bg-slate-100">
              <label for="economycost" className="text-xl font-medium">
                Enter Seat Cost For Economy Class
              </label>
              <input
                type="number"
                name="economycost"
                id="economycost"
                min="1"
                step="1"
                value={economyCost}
                disabled={!economyChecked}
                onChange={handleEcoCost}
                className="border border-slate-500 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            <div className=" p-3">
              <label for="businesscost" className="text-xl font-medium">
                Enter Seat Cost For Business Class
              </label>
              <input
                type="number"
                name="businesscost"
                id="businesscost"
                min="1"
                step="1"
                value={businessCost}
                disabled={!businessChecked}
                onChange={handleBusCost}
                className="border border-slate-500 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            <div className="bg-slate-100 p-3">
              <label for="firstcost" className="text-xl font-medium">
                Enter Seat Cost For First Class
              </label>
              <input
                type="number"
                name="firstcosst"
                id="firstcost"
                min="1"
                step="1"
                value={firstCost}
                disabled={!firstChecked}
                onChange={handleFirstCost}
                className="border border-slate-500 absolute left-1/2 h-8 p-2"
              ></input>
            </div>
            <div className="flex gap-20 justify-center mt-10">
              <button
                type="submit"
                className="bg-[#585eff] w-20 h-10 rounded-md text-white font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                type="reset"
                className="bg-[#ee3333] w-20 h-10 rounded-md text-white font-semibold"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
