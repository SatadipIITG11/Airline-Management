import React from 'react'

function About() {

  return (
    <div className='h-full w-full bg-[rgb(247,246,255)] pb-12'>
      <div className='bg-white w-[96%] md:w-[90%] lg:w-[80%] h-full m-auto pb-6 rounded-2xl'>
        <div className='text-[#8b1c64] text-center py-4 px-40 md:px-20 lg:px-40 text-xl font-bold'>
          <div>Welcome to Flyhigh, your trusted partner in simplifying air travel.</div>
          <div>At Flyhigh, we are dedicated to providing you with a seamless and efficient booking experience, ensuring that your journey starts off on the right foot</div>
        </div>
        <div className='w-[98%] m-auto flex flex-col md:flex-row justify-between mt-6'>
          <div className='w-2/3 bg-[rgb(247,246,255)] text-center p-4 rounded-lg shadow-xl hover:scale-[1.02]'>
            <h1 className='text-2xl font-bold'>Our Mission</h1>
            <p className='text-xl font-medium mt-4 px-10'>Our mission is to revolutionize the way you book flight, making it easier, faster and more convenient than ever before. We strive to empower travelers by offering a user-friendly platform that enables hassle-free booking, comprehensive flight information and exceptional customer service.</p>
          </div>
          <img src='/mission.jpeg' className='h-60 w-[32%] rounded-lg shadow-xl hover:scale-[1.02]'></img>
        </div>
        <div className='w-[98%] m-auto flex justify-between mt-6'>
          <img src='/whoweare.webp' className='h-60 w-[32%] rounded-lg shadow-xl hover:scale-[1.02]'></img>
          <div className='w-2/3 bg-[rgb(247,246,255)] text-center p-4 rounded-lg shadow-xl hover:scale-[1.02]'>
            <h1 className='text-2xl font-bold'>Who We Are</h1>
            <p className='text-xl font-medium mt-4 px-10'>Flyhigh is a leading provider of online flight booking services, catering to travelers from all walks of life. Our teams comprises dedicated professionals with extensive experience in the travel industry, committed to delivering excellence in every aspect of our service.</p>
          </div>
        </div>
        <div className='w-[98%] m-auto flex justify-between mt-6'>
          <div className='w-2/3 bg-[rgb(247,246,255)] text-center p-4 rounded-lg shadow-xl hover:scale-[1.02]'>
            <h1 className='text-2xl font-bold'>Our Commitment To You</h1>
            <p className='text-xl font-medium mt-4 px-10'>At Flyhigh, we are committed to excellence in every aspect of our service. Whether you are planning a business trip, a family vacation or, a spontaneous gateway, we're here to make your travel dreams a reality. Trust us to be your companion in the skies, and let us take you to your next destination with ease and comfort.</p>
          </div>
          <img src='/commitment.jpeg' className='h-60 w-[32%] rounded-lg shadow-xl hover:scale-[1.02]'></img>
        </div>
      </div>
    </div>
  )
}

export default About
