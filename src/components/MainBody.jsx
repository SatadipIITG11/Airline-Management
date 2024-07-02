import React from 'react'
import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';

const MainBody = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const status = async () => {
    console.log('Status Update');
      const response = await fetch('http://localhost:3000/api/update-profile-on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          status: 1,
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}, ${errorMessage}`);
      }
      const result = await response.json();
      console.log('Status:', result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log({
        email, 
        password
    });
    const data = {
        email, 
        password
    };
    let response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    if (response.ok) 
    console.log('Login successful', result);
    else
    console.error('Login Failed:', response.statusText);
      if(result.success)
      {
          alert(result.message);
          status();
          // window.location.href = '/';
          setUser({email: email, title: result.user.title, firstName: result.user.firstName, lastName: result.user.lastName, mobileNumber: result.user.mobileNumber});
          // const from = location.state?.from?.pathname || '/';
          navigate(-1);
      }
      else
        alert(result.message);
    // try {
    //   if (response.status === 200) {
    //      navigate('/home'); // Redirect to the dashboard or another page
    //   } else {
    //     setError(data.message);
    //   }
    // } catch (error) {
    //   setError('Invalid user credentials');
    // }
  };

  return (
    <>
      <div className='content flex flex-col md:flex-row pt-[100px] gap-[50px] h-[89.2vh] justify-center bg-red-300'>
        <div className='login w-full md:w-[40vw] h-[60vh] bg-white border rounded-2xl text-center pt-[40px]'>
          <h1 className='bg-white text-3xl font-bold'>Login</h1>
          <div className='info flex flex-col mt-8 bg-white items-center'>
            <form className='bg-white relative' onSubmit={handleSubmit}>
              <input className='w-80 h-10 border-2 rounded-xl border-black bg-white text-xl font-semibold ml-[20px] pl-2' type='text' placeholder='Email' value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="line w-[25vw] h-[2px] pt-0"></div>
              <input className="password w-80 h-10 border-2 rounded-xl border-black bg-white text-xl font-semibold ml-[20px] mt-[30px] pl-2" type='password' placeholder='Password' value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="line w-[25vw] h-[2px] pt-0"></div>
              {error && <p className='bg-white font-medium text-2xl' style={{ color: 'red' }}>{error}</p>}
              <button className='mt-9 w-32 h-14 text-2xl border rounded-2xl text-white font-semibold bg-[#8b1c64] top-[110px] left-[8vw] text-center hover:bg-[#4c0c36]' type='submit' id='log'>Login</button>
            </form>
          </div>
        </div>
        <div className='separation hidden md:block w-[5px] h-[45vh] bg-[#8b1c64]'>
        </div>
        <div className='register w-full md:w-[40vw] h-[60vh] bg-white border rounded-2xl text-center pt-[40px]'>
          <h1 className='bg-white text-3xl font-bold'>Don't Have An Account Yet?</h1>
          <div className='mt-[40px]'>
            <p className='text-2xl'>Booking flights, managing reservations</p>
            <p className='text-2xl'>and explore the world</p>
            <p className='text-2xl'>with us</p>
          </div>
          <Link to='/register'><button className='mt-[40px] w-full md:w-36 h-14 text-2xl border rounded-xl text-white font-semibold bg-[#8b1c64] hover:bg-[#4c0c36] text-center'>Register</button></Link>

        </div>
      </div>
    </>
  )
}

export default MainBody;