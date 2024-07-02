import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Login from './pages/Login' 
import Home from './pages/Home'
import Register from './pages/Register'
import FlightList from './pages/FlightList'
import Feedback from './pages/Feedback'
import PassengerForm from './pages/PassengerForm'
import Preview from './pages/Preview'
import Eticket from './pages/Eticket'
import Eticket_ from './pages/Eticket_'
import MyFlights from './pages/MyFlights'
import FlightStatus from './pages/FlightStatus'
import UserProfile from './pages/UserProfile'
import AirlineManagement from './sso/AirlineManagement'
import Bookings from './sso/Bookings'
import Update from './sso/Update'
import Feedbacks from './sso/Feedbacks'
import AddFlight from './sso/AddFlight'
import FlightsManagement from './sso/FlightsManagement'
import Schedule from './sso/Schedule'
import AddAirline from './sso/AddAirline'
import Profile from './sso/Profile'
import AdminDashboard from './sso/AdminDashboard'
import About from './pages/About'
import ViewFlights from './sso/ViewFlights'
import UserInfo from './sso/UserInfo'
import PassInfo from './sso/PassInfo'
import PassList from './sso/PassList'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetUser = (user) => {
    setUser(user);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  };

  return (
    <>
      <Router>
      <Routes>
        {/* Client Website Routes */}

        <Route path='/' element={<Home user={user} setUser={handleSetUser}/>}/>
        <Route path='/login' element={<Login user={user} setUser={handleSetUser}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/feedback' element={<Feedback user={user}/>}/>
        <Route path='/passform' element={<PassengerForm user={user}/>}/>
        <Route path='/preview' element={<Preview user={user}/>}/>
        <Route path='/eticket' element={<Eticket user={handleSetUser}/>}/>
        <Route path='/eticket_' element={<Eticket_ user={user}/>}/>
        <Route path='/user' element={<UserProfile/>}/>
        <Route path='/fltstatus/:originAirport/:destinationAirport/:selectedDate' element={<FlightStatus user={user} setUser={handleSetUser}/>}/>
        <Route path='/fltlist/:originAirport/:destinationAirport/:selectedDate/:passengers' element={<FlightList user={user} setUser={handleSetUser}/>}/>
        <Route path='/myflts' element={<MyFlights user={user}/>}/>
        <Route path='/about' element={<About/>}/>

        {/* Admin Portal Routes */}

        <Route path='/admin/airlinemanagement' element={<AirlineManagement/>}/>
        <Route path='/admin/bookings' element={<Bookings/>}/>
        <Route path='/admin/scheduleflt' element={<Schedule/>}/>
        <Route path='/admin/viewflt' element={<ViewFlights/>}/>
        <Route path='/admin/feedback' element={<Feedbacks/>}/>
        <Route path='/admin/fltmanagement' element={<FlightsManagement/>}/>
        <Route path='/admin/addflt' element={<AddFlight/>}/>
        <Route path='/admin/scheduled' element={<Update/>}/>
        <Route path='/admin/addairline' element={<AddAirline/>}/>
        <Route path='/admin/profile' element={<Profile/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/userinfo' element={<UserInfo/>}/>
        <Route path='/admin/passinfo' element={<PassInfo/>}/>
        <Route path='/admin/passlist' element={<PassList/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App;
