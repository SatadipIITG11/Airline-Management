import React from 'react'
import NavbarM from '../components/NavbarM'
import MainBody from '../components/MainBody'
import Footer from '../components/Footer'

const Login = ({user, setUser}) => {
  return (
    <>
    <NavbarM user={user}/>
    <MainBody setUser={setUser}/>
    {/* <Footer/> */}
    </>
  )
}

export default Login
