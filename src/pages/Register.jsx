import React, { useState } from 'react';
import NavbarL from '../components/NavbarL';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
// import './registration.css';

const Register = () => {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: ''
  });
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validation functions
  const isValidMobile = (number) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(number);
  };
  
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const doPasswordsMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidMobile(formData.mobileNumber)) {
      alert('Please enter a valid mobile number (10 digits).');
      return;
    }

    if (!doPasswordsMatch()) {
      alert('Passwords do not match.');
      return;
    }

    console.log(formData);
    // Send data to the backend
    let response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Email is already taken') {
        alert('Email is already taken.');
      } else {
        alert(data.message || 'Registration successful!');
        setFormData({
          title: 'Mr.',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          mobileNumber: ''
        });  // Reset form
        navigate('/login');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed: ' + error.message);
    });
  };

  return (
    <>
    <NavbarL/>
    <div className="mt-28 w-3/4 bg-white p-5 rounded-2xl m-auto drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]">
      <h1 className='text-center text-3xl font-bold '>REGISTER</h1>
      <form className="w-full mt-8 bg-white rounded-xl flex flex-wrap gap-y-4 justify-between" onSubmit={handleSubmit}>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-center ">
          <select className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' placeholder="title" id="title" name="title" value={formData.title} onChange={handleChange}>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
          </select>
        </div>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-center ">
          <input className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        </div>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-center">
          <input className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        </div>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-center">
          <input className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-center">
          <input className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' />
        </div>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-cente">
          <input className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
        </div>
        <div className="w-full md:basis-1/3 mb-2.5 flex items-center">
          <input className='p-2 w-4/5 border-b-2 border-solid border-[#ccc]' type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" />
        </div>
        <div className="mb-2.5 flex items-center justify-around basis-full">
          <button className='w-32 h-12 bg-[#8b1c64] text-white cursor-pointer rounded-xl text-xl font-semibold' type="submit" id="btn">Register</button>
          <Link to='/login'><button className='w-32 h-12 bg-[#8b1c64] text-white cursor-pointer rounded-xl text-xl font-semibold' type="button">Back</button></Link>
        </div>
      </form>
    </div>
    {/* <Footer/> */}
    </>
  );
}

export default Register;
