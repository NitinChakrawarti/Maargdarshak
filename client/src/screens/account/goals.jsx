import React from 'react';
import Layout from '../auth/layout';

const Goals = () => {
  return (
    <Layout >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Goals</h2>
        <p className="text-gray-600 mt-2">Set and track your career goals.</p>
      </div>
    </Layout>
  );
};

export default Goals;
