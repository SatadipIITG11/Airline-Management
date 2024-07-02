import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const UserProfile = () => {
  const location = useLocation();
  const data = location.state || {};
  const [userProfile, setUserProfile] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    gender: '',
    maritalStatus: '',
    address: '',
    email: '',
    mobileNumber: '',
    // frequentFlyerNumber: ''
  });

  // userProfile.title = data.userData.title;
  // userProfile.firstName = data.userData.firstName;
  // userProfile.lastName = data.userData.lastName;
  // userProfile.email = data.userData.email;
  // userProfile.phone = data.userData.mobileNumber;

  const [profileImage, setProfileImage] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingImage, setEditingImage] = useState(false);

  useEffect(() => {
    if (data.userData) {
      const updatedProfile = {
        title: data.userData.title || '',
        firstName: data.userData.firstName || '',
        lastName: data.userData.lastName || '',
        email: data.userData.email || '',
        mobileNumber: data.userData.mobileNumber || '',
        birthday: '',
        gender: '',
        maritalStatus: '',
        address: '',
      };
      setUserProfile(updatedProfile);
      calculateCompletion(updatedProfile);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Fetching profile...');
      try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const Data = await response.json();
        const filterdata = Data.filter(profile =>
          profile.email === data.userData.email
        )
        // console.log('Fetched user profile:', data);
        console.log(filterdata[0]);
        if (filterdata[0]) {
          const updatedProfile = {
            title: filterdata[0].title || '',
            firstName: filterdata[0].firstName || '',
            lastName: filterdata[0].lastName || '',
            email: filterdata[0].email || '',
            mobileNumber: filterdata[0].mobileNumber || '',
            birthday: filterdata[0].birthday || '',
            gender: filterdata[0].gender || '',
            maritalStatus: filterdata[0].maritalStatus || '',
            address: filterdata[0].address || '',
          };
          setUserProfile(updatedProfile);
          calculateCompletion(updatedProfile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    calculateCompletion(userProfile);
    fetchProfile();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    
    // if (name === 'frequentFlyerNumber' && isNaN(value)) {
    //   alert('Frequent Flyer Number must be a number');
    //   return;
    // }

    const updatedProfile = {
      ...userProfile,
      [name]: value,
    };
    setUserProfile(updatedProfile);
    calculateCompletion(updatedProfile);
    console.log('Updated user profile:', updatedProfile);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        console.log('Updated profile image');
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateCompletion = (profile) => {
    const fields = Object.values(profile);
    const completedFields = fields.filter((field) => field !== '');
    setCompletion(Math.round((completedFields.length / fields.length) * 100));
    console.log('Profile completion:', completion);
  };

  const toggleProfileEditing = () => {
    setEditingProfile(!editingProfile);
  };

  const toggleImageEditing = () => {
    setEditingImage(!editingImage);
  };

  const saveProfile = async () => {
    console.log('Saving profile...');
    try {
      const response = await fetch('http://localhost:3000/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userProfile.email,
          updatedProfile: { ...userProfile },
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}, ${errorMessage}`);
      }
      const result = await response.json();
      console.log('Profile save result:', result); 
      setEditingProfile(false); 
      console.log('Profile saved successfully');
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert(`Error updating profile: ${error.message}`);
    }
  };

  const saveImage = () => {
    // Save image to backend or perform any necessary actions
    setEditingImage(false); // Exit editing mode after saving
  };

  const renderInputField = (label, name, type = 'text') => {
    if (type === 'select') {
      return (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block text-gray-700 capitalize">
            {label}
          </label>
          <select
            id={name}
            name={name}
            value={userProfile[name]}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            disabled={!editingProfile} // Disable select when not editing
          >
            <option value="">{`Select ${label}`}</option>
            {name === 'title' && (
              <>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </>
            )}
            {name === 'gender' && (
              <>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </>
            )}
            {name === 'maritalStatus' && (
              <>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </>
            )}
          </select>
        </div>
      );
    } else {
      return (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block text-gray-700 capitalize">
            {label}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            value={userProfile[name]}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            disabled={!editingProfile || name === 'email'} // Disable input when not editing or if it's the email field
          />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-8 relative">
        <div className="text-center mb-6">
          <div className="relative w-36 h-36 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-500">👤</span>
            )}
            {editingImage && (
              <label
                htmlFor="profileImageUpload"
                className="absolute bottom-4 right-4 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
              >
                ✏️
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold">Personal Profile</h2>
        </div>
        {/* <ul>
          <li className="mb-2">
            <a href="#" className="text-blue-500 hover:underline">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:underline">
              Login Details
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:underline">
              Save Travellers
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:underline">
              Logout
            </a>
          </li>
        </ul> */}
      </div>
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-8 mt-10 md:mt-0 md:ml-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-700">Complete your Profile</p>
            <div className="bg-gray-200 h-2 rounded-full mt-1 mr-4">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
            <p className="text-gray-700 mt-1">{completion}%</p>
          </div>
        </div>
        {!editingProfile && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={toggleProfileEditing}
            >
              Edit Profile{" "}
              <span role="img" aria-label="edit">
                ✏️
              </span>
            </button>
          )}
          {editingProfile && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          )}
          {!editingImage && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
              onClick={toggleImageEditing}
            >
              Edit Image{" "}
              <span role="img" aria-label="edit">
                ✏️
              </span>
            </button>
          )}
          {editingImage && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4"
              onClick={saveImage}
            >
              Save Image
            </button>
          )}
        <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>
        <form>
          {renderInputField("Title", "title", "select")}
          {renderInputField("First Name", "firstName")}
          {renderInputField("Last Name", "lastName")}
          {renderInputField("Birthday", "birthday", "date")}
          {renderInputField("Gender", "gender", "select")}
          {renderInputField("Marital Status", "maritalStatus", "select")}
          {renderInputField("Address", "address")}
          {renderInputField("Email", "email", "email")}
          {renderInputField("Phone", "mobileNumber", "tel")}
          {/* {renderInputField("Frequent Flyer Number", "frequentFlyerNumber", "number")} */}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
