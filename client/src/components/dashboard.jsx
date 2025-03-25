import React from 'react';

const UserDashboard = () => {
  return (
    <section id="user-dashboard" className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Your Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl">Profile Overview</h3>
            <p className="text-gray-600">Summary of your career assessment, skills, goals, and achievements.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl">Progress Tracker</h3>
            <p className="text-gray-600">Visual representation of your milestones and goal completion.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl">Notifications</h3>
            <p className="text-gray-600">Updates on new recommendations and milestone achievements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
