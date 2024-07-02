import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Body = () => {
  const [showBookFlight, setShowBookFlight] = useState(true);
  const [airports, setAirports] = useState([]);
  const [airports_, setAirports_] = useState([]);
  const [originAirport, setOriginAirport] = useState('NULL');
  const [originAirport_, setOriginAirport_] = useState('NULL');
  const [destinationAirport, setDestinationAirport] = useState('NULL');
  const [destinationAirport_, setDestinationAirport_] = useState('NULL');
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [filteredAirports_, setFilteredAirports_] = useState([]);
  const [passengers, setPassengers] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDate_, setSelectedDate_] = useState('');

  const navigate = useNavigate();

  const currentDateUTC = new Date();
  const currentDateIST = new Date(currentDateUTC.getTime() + (5.5 * 60 * 60 * 1000));
  console.log(currentDateIST);
  const currentDate = currentDateIST.toISOString().split('T')[0];

  const handleChangeP = (event) => {
    setPassengers(parseInt(event.target.value));
  };

  const handleChangeD = (event) => {
    setSelectedDate(event.target.value);
  };
  
  const handleChangeD_ = (event) => {
    setSelectedDate_(event.target.value);
  };

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
        const Filter = data.filter(airport => airport.code !== destinationAirport_);
        setAirports_(Filter);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [destinationAirport_]);

  useEffect(() => {
    fetch('http://localhost:3000/api/airports')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(airport => airport.code !== originAirport);
        setFilteredAirports(filtered);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [originAirport]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/airports')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(airport => airport.code !== originAirport_);
        setFilteredAirports_(filtered);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [originAirport_]);

  const handleToggle = () => {
    setShowBookFlight(!showBookFlight);
  };

  const handleChange = event => {
    setOriginAirport(event.target.value);
  };
  
  const handleChangeF = event => {
    setOriginAirport_(event.target.value);
  };

  const handleChange_ = event => {
    setDestinationAirport(event.target.value);
  };
  
  const handleChangeF_ = event => {
    setDestinationAirport_(event.target.value);
  };

  useEffect(() => {
    console.log('Origin airport selected:', originAirport);
  }, [originAirport]);
  
  useEffect(() => {
    console.log('Destination airport selected:', destinationAirport);
  }, [destinationAirport]);

  useEffect(() => {
    console.log('Passengers:',passengers);
  },)

  useEffect(() => {
    console.log('Date:',selectedDate);
  },)

  useEffect(() => {
    // Function to set the current date to state
    const setSystemDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
      setSelectedDate_(formattedDate);
    };
    // Call the function to set the current date when the component mounts
    setSystemDate();
  }, []);

  const handleSubmit = async () => {
    if (showBookFlight)
    {
      console.log("Submitting booking information");
      const data = {
        originAirport,
        destinationAirport,
        selectedDate,
        passengers
      };
      console.log("Booking submitted:", data);
    } 
    else 
    {
      console.log("Submitting flight status information");
      console.log("Flight status submitted:", {
        originAirport_,
        destinationAirport_,
        selectedDate_,
      });
      const data = {
        originAirport_,
        destinationAirport_,
        selectedDate_,
      };
      let response = await fetch("http://localhost:3000/fltstatus", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) 
      {
        const result = await response.json();
        console.log('Flight Status submitted successfully:', result);
      } 
      else
      console.error('Failed to submit flight status:', response.statusText);
    }
  };
  
  return (
    <>
    <video src="/bghome.mp4" autoPlay muted loop className="fixed top-0 object-cover justify-center z-[-1] min-h-[100vh]"/>
    <div className="flex flex-col justify-center items-center">
    <div className="flex flex-col justify-center items-center mt-80 w-2/5">
      <div className="bg-white h-96 w-full max-w-4xl text-black border rounded-3xl flex flex-col justify-center items-center">
          <div className="mb-4 flex flex-col justify-center gap-y-4">
            <div className="flex justify-between gap-5">
              <button onClick={handleToggle} className={`px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${showBookFlight ? 'bg-blue-600 text-white' : 'bg-blue-400 text-black'}`}>Book a Flight</button>
              <button onClick={handleToggle} className={`px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${showBookFlight ? 'bg-blue-400 text-black' : 'bg-blue-600 text-white'}`}>Flight Status</button>
            </div>
            <div style={{ display: showBookFlight ? 'block' : 'none' }}>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
              <select type="dropdown" id="from" value={originAirport} onChange={handleChange} className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2">
                <option value="NULL" key="NULL">Select Origin</option>
                {airports.map(airport => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name} - {airport.country}
                  </option>
                ))}
              </select>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
              <select type="dropdown" id="to" value={destinationAirport} onChange={handleChange_} className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2">
                <option value="NULL" key="NULL">Select Destination</option>
                {filteredAirports.map(airport => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name} - {airport.country}
                  </option>
                ))}
              </select>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="date" value={selectedDate} onChange={handleChangeD} min={currentDate} name="date" className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2" />
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passengers</label>
              <input type="number" id="passengers" className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2" min="1" value={passengers} onChange={handleChangeP}/>
            </div>
            <div style={{ display: showBookFlight ? 'none' : 'block' }}>
              <label htmlFor="fromStatus" className="block text-sm font-medium text-gray-700">From</label>
              <select type="dropdown" id="fromStatus" value={originAirport_} onChange={handleChangeF} className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2" placeholder="Enter starting point">
                <option value="NULL" key="NULL">Select Origin</option>
                  {airports_.map(airport => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name} - {airport.country}
                    </option>
                  ))}
              </select>
              <label htmlFor="toStatus" className="block text-sm font-medium text-gray-700">To</label>
              <select type="dropdown" id="toStatus" value={destinationAirport_} onChange={handleChangeF_} className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2">
                <option value="NULL" key="NULL">Select Destination</option>
                  {filteredAirports_.map(airport => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name} - {airport.country}
                    </option>
                  ))}
              </select>
              <label htmlFor="dateStatus" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="dateStatus" value={selectedDate_} onChange={handleChangeD_} min={currentDate} className="mt-1 block w-full border-2 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8 pl-2" />
            </div>
          <div className="flex justify-center items-center">
          {showBookFlight ? 
          (
            <Link to={`/fltlist/origin=${originAirport}/destination=${destinationAirport}/date=${selectedDate}/passengers=${passengers}`} state={{ originAirport: originAirport, destinationAirport: destinationAirport, selectedDate: selectedDate, passengers:passengers }}><button type="submit" id="submit" onClick={handleSubmit} disabled={originAirport === "NULL" || destinationAirport === "NULL"} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">Search Flights</button></Link>
          ):(
            <Link to={`/fltstatus/origin=${originAirport_}/destination=${destinationAirport_}/date=${selectedDate_}`} state={{ originAirport: originAirport_, destinationAirport: destinationAirport_, selectedDate: selectedDate_ }}><button type="submit" id="submit" onClick={handleSubmit} disabled={originAirport_ === "NULL" || destinationAirport_ === "NULL"} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">Search Flights</button></Link>
          )}
          </div>
          </div>
      </div>
      </div>
      <div className="container flex justify-around items-center m-20 w-full h-[160vh] bg-[#f6faff] flex-col">
          <div className="flex justify-center items-center gap-24">
            <div className="image h-[300px] w-1/3 m-4 rounded-3xl bg-[url('/airplane.avif')] bg-center">

            </div>
            <div className="w-1/2 pt-8">
              <div className="font-bold text-4xl text-center">Start Planning your next trip</div>
              <div className="flex flex-row p-2 mt-4">
                <div className="p-2">
                  <h1 className="font-bold text-lg">Experience Tranquility</h1>
                  <p>Serenity Haven offers a tranquil escape, featuring comfortable seating, calming ambiance and attentive service.</p>
                </div>
                <div className="p-2">
                  <h1 className="font-bold text-lg">Elevate Your Experience</h1>
                  <p>Designed for discerning travelers, this exclusive lounge offers premium amenities, assistance and private workspace.</p>
                </div>
              </div>
              <div className="flex flex-row p-2">
                <div className="p-2">
                  <h1 className="font-bold text-lg">A Welcoming Space</h1>
                  <p>Create a family-friendly atmosphere, The Family Zone is the perfect haven for parents and children.</p>
                </div>
                <div className="p- ml-10">
                  <h1 className="font-bold text-lg">A Culinary Delight</h1>
                  <p>Immerse yourself in a world of flavors, offering international cuisines, gourmet dishes and carefully curated beverages.</p>
                </div>
              </div>
              {/* <div className="h-56 border-2 border-black m-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, necessitatibus veniam minus numquam corrupti voluptatem, repellat non molestiae, dicta vero ad doloremque sunt assumenda quo modi aut sequi. Cumque, autem. Minus similique est vero nesciunt repellat magnam quisquam et eos fuga, aspernatur provident sed at nulla, facilis, repellendus eaque maxime.</div> */}
            </div>
          </div>
          <div className="text-3xl pt-10">Explore New Places</div>
          <div className="places flex justify-between items-center ">
            <div>
              <div className="border-2 border-black h-[300px] w-[250px] m-4 rounded-3xl bg-[url('/mumbai.jpg')] bg-bottom bg-cover"></div>
              <div className="text-center text-xl font-semibold">Mumbai</div>
            </div>
            <div>
              <div className="border-2 border-black h-[300px] w-[250px] m-4 rounded-3xl bg-[url('/chennai.jpg')] bg-bottom bg-cover"></div>
              <div className="text-center text-xl font-semibold">Chennai</div>
            </div>
            <div>
              <div className="border-2 border-black h-[300px] w-[250px] m-4 rounded-3xl bg-[url('/kolkata.jpeg')] bg-bottom bg-cover"></div>
              <div className="text-center text-xl font-semibold">Kolkata</div>
            </div>
            <div>
              <div className="border-2 border-black h-[300px] w-[250px] m-4 rounded-3xl bg-[url('/delhi.jpg')] bg-top bg-cover"></div>
              <div className="text-center text-xl font-semibold">Delhi</div>
            </div>
          </div>
          <div className="conclude bg-black text-white m-[1.35rem] w-full flex justify-around items-start p-4">
            <div className="vid h-40 w-64 bg-green-800 m-2">
            <img className="h-40 w-64" src="https://cdn.dribbble.com/users/1774872/screenshots/5506429/media/b2656cb0577ed875ea891f2f90bb132b.gif"></img>
            </div>
            <div className>
              <h1 className="text-xl font-semibold">INFORMATION</h1>
              <ul className="py-2">
                <li className="py-2">Home</li>
                <li className="py-2">About</li>
                <li className="py-2">Feedback</li>
              </ul>
            </div>
            <div className="">
              <h1 className="text-xl font-semibold">CONTACT</h1>
              <p className="py-2">Flyhigh@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Body;
