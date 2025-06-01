import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResourceHeader = () => {
  const location = useLocation();

  const actions = [
    { label: "All Resources", to: "/mentor/resources" },
    { label: "Add New", to: "/mentor/resources/add" }
  ];

  return (
    <div className="flex md:flex-row flex-col md:items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <h1 className="md:text-2xl text-xl font-bold text-[#1a3a6c]">Resources</h1>
      <div className="flex mt-4 md:mt-0 gap-x-4">
        {actions.map(({ label, to }, index) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={index}
              to={to}
              className={`flex gap-2 rounded-lg md:text-md text-sm border-2 items-center py-2 px-4 transition-colors
                ${isActive ? 
                  'bg-dark-blue text-white border-brand-navy' : 
                  'bg-white text-[#1a3a6c] border-[#b5d5e5] hover:bg-[#b5d5e5]/20'
                }`
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceHeader;
