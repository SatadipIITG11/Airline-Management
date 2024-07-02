import React, { useState } from 'react';
import NavbarM from '../components/NavbarM';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const PassengerForm = ({user}) => {
  const location = useLocation();
  const data = location.state || {};
  const [errors, setErrors] = useState(Array.from({ length: data.passengers }, () => ({})));
  const [formData, setFormData] = useState(Array.from({ length: data.passengers }, () => ({
    title: 'Mr',
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    mobile: ''
  })));

  console.log(data);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const validateForm = () => {
    const currentErrors = formData.map(passenger => {
      const passengerErrors = {};
      if (!passenger.title) passengerErrors.title = 'Title is required';
      if (!passenger.firstName) passengerErrors.firstName = 'First Name is required';
      if (!passenger.lastName) passengerErrors.lastName = 'Last Name is required';
      if (!passenger.gender) passengerErrors.gender = 'Gender is required';
      if (!passenger.dob) {
        passengerErrors.dob = 'Date of Birth is required';
      } else if (new Date(passenger.dob) > new Date()) {
        passengerErrors.dob = 'Date of Birth cannot be in the future';
      }
      if (!passenger.mobile) {
        passengerErrors.mobile = 'Mobile Number is required';
      } else if (!/^\d{10}$/.test(passenger.mobile)) {
        passengerErrors.mobile = 'Mobile Number must be 10 digits';
      }
      return passengerErrors;
    });

    setErrors(currentErrors);

    // Check if there are any errors
    return currentErrors.every(error => Object.keys(error).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add your form submission logic here
      console.log(formData);
      navigate('/preview', {state:{formData: formData, data: data}});
    } else {
      console.log('Form has errors:', errors);
      // alert('Please correct the errors in the form.');
    }
    // console.log('Form submitted:', formData);
    // // Add your form submission logic here
    // console.log(formData);
  };

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
    <>
    <NavbarM user={user}/>
    <div className="flight-listing-container w-3/4 mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <div className='text-center text-2xl font-bold mb-3'>Chosen Flight</div>
      <div className="flight-card p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-xl font-bold">
            {data.flightName}
          </h1>
          <h1 className="text-lg text-gray-600 font-bold">
            {data.flightNumber}
          </h1>
          <h1 className="text-lg font-bold">{data.seat}</h1>
        <div className="flex justify-between items-center mt-6">
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-lg">{data.originAirport}</p>
            <p className="text-gray-600">{formatDateTime(data.departureTime)[1]}</p>
            <p className="text-gray-600">{formatDate(formatDateTime(data.departureTime)[0])}</p>
          </div>
          <div className="relative flex items-center flex-1 mx-4">
            <div className="flex-1 border-t border-gray-300 relative" style={{ top: '-0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}></div>
            <p className="mx-4 text-center relative" style={{ top: '-0.75rem' }}>{timeDifference(data.departureTime, data.arrivalTime)}</p>
            <div className="flex-1 border-t border-gray-300 relative" style={{ top: '-0.5rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}></div>
          </div>
          <div className="text-center">
            <p className="text-lg">{data.destinationAirport}</p>
            <p className="text-gray-600">{formatDateTime(data.arrivalTime)[1]}</p>
            <p className="text-gray-600">{formatDate(formatDateTime(data.arrivalTime)[0])}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="w-3/4 mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Passenger Information</h2>
      <form onSubmit={handleSubmit}>
        {formData.map((passenger, index) => (
          <div key={index} className="mb-8">
            <div className="title font-bold text-lg">Passenger {index+1}:</div>
            <div className="flex mb-3">
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 lg:w-1/3 pr-0 md:pr-4">
                <label className="block text-gray-700">Title:</label>
                <select
                  name="title"
                  value={passenger.title}
                  onChange={(e) => handleChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
                {errors[index].title && <p className="text-red-500 text-sm">{errors[index].title}</p>}
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 pr-0 md:pr-4">
                <label className="block text-gray-700">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={passenger.firstName}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors[index].firstName && <p className="text-red-500 text-sm">{errors[index].firstName}</p>}
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 pr-0 md:pr-4">
                <label className="block text-gray-700">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={passenger.lastName}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors[index].lastName && <p className="text-red-500 text-sm">{errors[index].lastName}</p>}
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 lg:w-1/3 pr-0 md:pr-4">
                <label className="block text-gray-700">Gender:</label>
                <select
                  name="gender"
                  value={passenger.gender}
                  onChange={(e) => handleChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors[index].gender && <p className="text-red-500 text-sm">{errors[index].gender}</p>}
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 pr-0 md:pr-4">
                <label className="block text-gray-700">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={passenger.dob}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors[index].dob && <p className="text-red-500 text-sm">{errors[index].dob}</p>}
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 pr-0 md:pr-4">
                <label className="block text-gray-700">Mobile Number:</label>
                <input
                  type="number"
                  name="mobile"
                  value={passenger.mobile}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors[index].mobile && <p className="text-red-500 text-sm">{errors[index].mobile}</p>}
              </div>
            </div>
            <div className="flex mb-4">
            </div>
          </div>
        ))}
        <Link to='/preview' onClick={handleSubmit} state={{formData: formData, data: data}}><button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
          Submit
        </button></Link>
      </form>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default PassengerForm;
