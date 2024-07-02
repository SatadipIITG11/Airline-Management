import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import NavbarM from '../components/NavbarM';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Feedback = ({user}) => {
  const [formData, setFormData] = useState({
    email: JSON.parse(sessionStorage.getItem('user')).email,
    firstImpression: '',
    hearAbout: '',
    missingAnything: '',
    rating: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting feedback:', formData); // Log form data
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Feedback Submitted:', data);
      if(data.success)
        window.location.href = '/';
    } catch (error) {
      console.error('There was an error submitting the feedback:', error);
    }
    
  };

  return (
    <>
    <NavbarM user={user}/>
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center">
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
      <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] md:h-[500px] w-[300px] md:w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(255,0,182,0.25)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md relative">
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(255,0,182,0.25)] opacity-50 blur-[80px]"></div>
        </div>
        <div className="flex items-center mb-6">
          <FontAwesomeIcon icon={faCommentDots} className="text-indigo-600 mr-2 w-6 h-6" />
          <h1 className="text-2xl font-bold">Feedback Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstImpression" className="block text-sm font-medium text-gray-700">What was your first impression when you entered the website?</label>
            <textarea id="firstImpression" name="firstImpression" value={formData.firstImpression} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" required />
          </div>
          
          <div className="mb-4">
            <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700">How did you first hear about us?</label>
            <select id="hearAbout" name="hearAbout" value={formData.hearAbout} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" required >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="search_engine">Search Engine</option>
              <option value="friend">Friend</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="missingAnything" className="block text-sm font-medium text-gray-700">Is there anything missing on this page?</label>
            <textarea id="missingAnything" name="missingAnything" value={formData.missingAnything} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rate your experience:</label>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className={`cursor-pointer ${formData.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}>
                  <input type="radio" name="rating" value={star} checked={formData.rating === star} onChange={() => handleRatingChange(star)} className="hidden" required/>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.429 8.2 1.191-5.918 5.765 1.395 8.128L12 18.902l-7.345 3.863 1.395-8.128L.737 9.207l8.2-1.191L12 .587z"/></svg>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit Feedback</button>
          {/* {isSubmitted && <Link to="/" className="hidden" />} */}
        </form>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default Feedback;
