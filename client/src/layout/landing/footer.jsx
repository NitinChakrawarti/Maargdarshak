import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-brand-orange">Margdarshak</h2>
          <p className="mt-4 text-brand-sky">
            Your go-to platform for career guidance, resources, and opportunities to reach your professional goals.
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              {
                label: "Facebook",
                path: "M22 12c0-5.522-4.478-10...",
              },
              {
                label: "Twitter",
                path: "M8.29 20c7.547 0 11.675-6.253...",
              },
              {
                label: "LinkedIn",
                path: "M19 0h-14c-2.761 0-5 2.239...",
              },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                aria-label={item.label}
                className="text-brand-sky hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:text-center">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Mentors", to: "/ourmentors" },
            ].map(({ label, to }, i) => (
              <li key={i}>
                <Link
                  to={to}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-brand-sky hover:text-white transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-1 text-brand-sky">
            <li>Email: support@margdarshak.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: RGPV University, Bhopal, M.P.</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-brand-sky text-sm">
        &copy; {new Date().getFullYear()} Margdarshak. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
