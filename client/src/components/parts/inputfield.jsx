// const InputField = ({
//   label,
//   name,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   className = "",
// }) => {
//   return (
//     <div className={`flex flex-col gap-2 ${className}`}>
//       <label htmlFor={name} className="text-dark-blue font-medium">
//         {label}
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className="border-2 rounded-lg py-2 px-4 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary"
//       />
//     </div>
//   );
// };

// export default InputField;



  const InputField = ({ label, name, type, value, onChange, icon: Icon, placeholder, required = true }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {Icon && <Icon size={16} />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:outline-0 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
      />
    </div>
  );

  export default InputField;
