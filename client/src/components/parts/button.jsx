const Button = ({ label, onClick, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`border-2 rounded-lg py-2 px-4 bg-blue-500 text-white dark:text-white hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-secondary ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;