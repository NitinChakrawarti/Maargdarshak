import React from 'react';
import MentorSection from '../../components/mentors/mentors';
import Layout from '../auth/layout';
const ConnectMentors = () => {
  return (
    <>
      <Layout>
        <div className=" rounded-lg pt-20 px-4 lg:py-2 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-800">Connect with Mentors</h2>
          <p className="text-soft-gray mt-2">Find mentors to guide you in your career path.</p>
        </div>
        <div>
          <MentorSection />
        </div>
      </Layout>
    </>
  );
};

export default ConnectMentors;
