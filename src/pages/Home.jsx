import { useState } from 'react'
// import './App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Body from '../components/Body'


function Home({user, setUser}) {
  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <Body/>
      <Footer/>
    </>
  )
}

export default Home;
