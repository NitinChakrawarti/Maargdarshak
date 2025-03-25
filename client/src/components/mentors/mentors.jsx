import React, { useEffect } from 'react';
import MentorProfile from './mentorprofile';
import { useContext } from 'react';
import { BackContext } from '../../context/contextapi';
import axios from 'axios';

const MentorSection = () => {
  const [mentordata, setmentordata] = React.useState({});
  const { back, setBack } = useContext(BackContext);
  const [mentors, setMentors] = React.useState([]);
  const mentorConnect = (mentor) => {
    setBack(true);
    setmentordata(mentor);
  };
  useEffect(() => {
    axios.get(import.meta.env.VITE_BASE_URL + '/mentors')
      .then((response) => {
        setMentors(response.data);
      }
      )
      .catch((error) => {
        console.error('There was an error!', error);
      });
  })

  return (
    <>
      {back ? <MentorProfile mentordata={mentordata} />
        :
        <div className={`bg- min-h-screen py-10 px-5 lg:px-20 rounded-lg block`}>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg- rounded-lg shadow-md overflow-hidden ">
                <img src={mentor.image} alt={mentor.name} className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col justify-between h-56">
                  <h3 className="text-2xl font-semibold text-black">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.jobTitle}</p>
                  <p className="text-black mt-2"><strong>Expertise:</strong> {mentor.expertise}</p>
                  <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-800 transition duration-300" onClick={() => mentorConnect(mentor)}>
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default MentorSection;
