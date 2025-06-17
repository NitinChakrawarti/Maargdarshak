import React from "react";
import Layoutcomponent from "../layout/landing/layoutcomponent";
import { Link } from "react-router-dom";

// Dummy mentor data
const mentors = [
  {
    id: 1,
    name: "Alex Johnson",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    jobTitle: "Senior Software Engineer ( Google )",
    expertise: "Development, Machine Learning",
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    jobTitle: "Data Scientist ( Facebook )",
    expertise: "Data Science, AI",
  },
  {
    id: 3,
    name: "John Smith",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
    jobTitle: "Product Manager ( Amazon )",
    expertise: "Product Management, Marketing",
  },
  {
    id: 4,
    name: "Sarah Clark",
    image:
      "https://images.pexels.com/photos/785667/pexels-photo-785667.jpeg?auto=compress&cs=tinysrgb&w=600",
    jobTitle: "UX Designer ( Apple )",
    expertise: "Design, User Experience",
  },
  {
    id: 5,
    name: "Chris Lee",
    image:
      "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600",
    jobTitle: "Software Engineer ( Microsoft )",
    expertise: "Development, Cloud Computing",
  },
  {
    id: 6,
    name: "Emily Davis",
    image:
      "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600",
    jobTitle: "Marketing Manager ( Tesla )",
    expertise: "Marketing, Content Creation",
  },
];

const Mentor = () => {
  return (
    <Layoutcomponent>
      <section className="bg-bg py-16 px-2 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {/* <div className="mb-12">
            <div className="pl-6 lg:pl-12 bg-brand-navy rounded-b-[100%] rounded-bl-[20%] pb-8">
              <h1 className="text-2xl lg:text-4xl font-bold text-bg pt-12">
                Meet Our Mentors
              </h1>
            </div>
            <p className="text-md lg:text-lg md:w-[80%] mt-10 lg:px-12 px-4 text-soft-gray leading-relaxed">
              Our mentors are professionals from top companies who bring a wealth of experience and insights to help guide you on your career journey.
            </p>
          </div> */}

          <div className='pt-4 px-4 md:px-4 max-w-7xl mx-auto'>
            <div className="bg-gradient-to-br from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] rounded-lg px-8 py-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2c67a6]/20 via-[#0ea5e9]/20 to-[#3b82f6]/20 opacity-50"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b5d5e5]/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#f7a35c]/30 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-white mb-2">Meet Our Mentors</h1>
                <p className="text-[#b5d5e5] mb-6">Our mentors are industry experts dedicated to helping you succeed.</p>
              </div>
            </div>
          </div>

          {/* Mentor Cards */}
          <div className="grid grid-cols-1 mt-8 lg:px-12 px-2 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-brand-blue mb-1">
                  {mentor.name}
                </h3>
                <p className="text-md font-medium text-brand-navy">
                  {mentor.jobTitle}
                </p>
                <p className="text-soft-gray text-sm mt-3 text-center">
                  <strong>Expertise:</strong> {mentor.expertise}
                </p>
              </div>
            ))}
          </div>

          {/* Why Choose Our Mentors */}
          <div className="mt-20 bg-brand-navy text-bg py-16 lg:px-16 px-6 rounded-xl shadow-lg">
            <h3 className="text-3xl lg:text-4xl font-bold mb-8">
              Why Learn From Our Mentors?
            </h3>
            <p className="text-lg lg:text-xl lg:w-[80%] mb-12">
              With years of experience, unparalleled expertise, and a passion for mentoring, our mentors are committed to helping you succeed.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Industry Leaders",
                  desc: "Professionals from top-tier companies like Google, Facebook, Amazon, and more.",
                },
                {
                  title: "Hands-On Guidance",
                  desc: "Get personalized advice tailored to your career goals and aspirations.",
                },
                {
                  title: "Extensive Expertise",
                  desc: "Learn from their diverse skill sets, ranging from development to design.",
                },
                {
                  title: "Practical Experience",
                  desc: "Insights and knowledge grounded in real-world experience and success.",
                },
                {
                  title: "Global Network",
                  desc: "Connect with professionals working in the most innovative industries worldwide.",
                },
                {
                  title: "Career Advancement",
                  desc: "Guidance to help you achieve your goals and excel in your chosen field.",
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="bg-white text-dark-blue p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-xl font-semibold text-brand-orange mb-2">
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Call-to-Action */}
          <div className="mt-20 px-4 lg:px-16 text-center">
            <h3 className="text-3xl lg:text-5xl font-bold text-brand-navy mb-8">
              Ready to Learn from the Best?
            </h3>
            <p className="text-lg lg:text-xl text-soft-gray mb-10 max-w-3xl mx-auto">
              Join us today and start your journey with the best mentors in the industry. Together, we’ll help you achieve your goals and unlock your potential.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-gradient-to-l from-brand-navy to-brand-blue text-bg px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Connect with Mentors
              </Link>
              <Link
                to="/mentor-signup"
                className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-brand-blue/90 transition-colors"
              >
                Join as Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layoutcomponent>
  );
};

export default Mentor;
