const Button = ({ label, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 bg-brand-navy text-white rounded-lg shadow-md hover:bg-primary transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
