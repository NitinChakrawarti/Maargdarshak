import React from "react";

const CareerAssessment = () => {
  return (
    <section id="career-assessment" className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Career Assessment</h2>
        <div className="my-8">
          <a
            href="#take-assessment"
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Take the Assessment
          </a>
        </div>
        <p>
          Discover your strengths, set goals, and find tailored opportunities
          for your career growth.
        </p>
      </div>
    </section>
  );
};

export default CareerAssessment;
