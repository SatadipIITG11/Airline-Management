import React, { useEffect, useState } from "react";
import AdminMenu from "../components/AdminMenu";
import AdminNav from "../components/AdminNav";


function Feedbacks() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/feedback');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setFeedbackData(data);

                const totalRating = data.reduce((sum, feedback) => sum + feedback.rating, 0);
                const average = totalRating / data.length;
                setAverageRating(average.toFixed(1))

              } catch (error) {
                  setError(error.message);
              }
          };

          fetchFeedbackData();
      }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen min-w-screen">
      <div className="min-h-screen col-span-3 flex flex-col items-center">
        <AdminMenu />
      </div>
      <div className=" min-h-screen col-span-9">
        <AdminNav />
        <div className="w-[70vw] min-h-[220px] p-4 mt-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl text-gray-500 font-semibold">Feedbacks</h1>
            <div className="rounded-lg shadow-lg h-40 w-[250px] p-3 relative mr-8">
                <div className="absolute bottom-[110px] h-14 w-14 bg-black text-white rounded-lg flex items-center justify-center font-semibold text-2xl shadow-lg shadow-gray-300">{averageRating}</div>
                <div className="flex justify-end">
                    <div className="flex flex-col items-end mb-10">
                        <p className="text-slate-500">Average Rating</p>
                        <p className="font-bold text-xl">{averageRating}</p>
                    </div>
                </div>
                <div className="text-green-500 font-semibold pt-2">Positive</div>
            </div>
          </div>
            <div className="search-container flex items-center mb-3">
              <form action="/action_page.php">
                <input
                  type="text"
                  className="border-2 border-black w-[200px] mr-4 rounded-lg px-2"
                  placeholder="Search Here"
                  name="search"
                />
                <button type="submit" className="mr-2">
                  <i className="fa fa-search"></i>
                </button>
              </form>
              <span className="text-gray-600">
                (You can search passenger details using pid)
              </span>
            </div>
          
          <div>
            <table className="table-auto border-collapse border border-slate-500 min-w-full">
              <tr className="even:bg-gray-100">
                <th className="border border-slate-600 px-4 py-2">#</th>
                <th className="border border-slate-600 px-4 py-2">USER EMAIL</th>
                <th className="border border-slate-600 px-4 py-2">FIRST IMPRESSION</th>
                <th className="border border-slate-600 px-4 py-2">COME ACROSS</th>
                <th className="border border-slate-600 px-4 py-2">SUGGESTION</th>
                <th className="border border-slate-600 px-4 py-2">RATING</th>
              </tr>
              {feedbackData.map((feedback, index) => (
              <tr key={index} className="even:bg-zinc-300">
                <td className="border border-slate-600 text-center px-4 py-2">{index+1}</td>
                <td className="border border-slate-600 text-center px-4 py-2">{feedback.email}</td>
                <td className="border border-slate-600 text-center px-4 py-2">{feedback.firstImpression}</td>
                <td className="border border-slate-600 text-center px-4 py-2">{feedback.hearAbout}</td>
                <td className="border border-slate-600 text-center px-4 py-2">{feedback.missingAnything}</td>
                <td className="border border-slate-600 text-center px-4 py-2">{feedback.rating}</td>
              </tr>
              ))}
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedbacks;
