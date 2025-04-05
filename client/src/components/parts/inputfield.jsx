const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-dark-blue font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-2 rounded-lg py-2 px-4 bg-transparent text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary"
      />
    </div>
  );
};

export default InputField;
