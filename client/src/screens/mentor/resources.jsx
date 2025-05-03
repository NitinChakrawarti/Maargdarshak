import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../layout/auth/layout';
import Button from '../../components/parts/button';
import ResourceHeader from '../../components/mentor/resourceheader';

const MentorResources = () => {
  const [showAllResources, setShowAllResources] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleToggle = () => {
    setShowAllResources(!showAllResources);
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Layout>
      <div className='container mx-auto py-4 px-4 md:px-4 max-w-7xl'>
        <div className='flex flex-col gap-6'>
          <ResourceHeader selectedIndex={selectedIndex} handleSelect={handleSelect} />
          {/* Content area with brand styling */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-l-4 border-[#f7a35c] pl-4 mb-6">
              <h2 className="text-2xl font-semibold text-[#1a3a6c]">
                {showAllResources ? 'All Resources' : 'My Resources'}
              </h2>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <Button 
                onClick={handleToggle}
                className="bg-[#7ba779] hover:bg-[#7ba779]/90 text-white px-4 py-2 rounded-lg"
              >
                {showAllResources ? 'Show My Resources' : 'Show All Resources'}
              </Button>
            </div>
            
            {/* Resources will be displayed here */}
            <div className="bg-[#b5d5e5]/10 rounded-lg p-4">
              <p className="text-[#1a3a6c]">Resource content will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorResources;
