const AppInput = ({ placeholder, name, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    name={name}
    step="0.0001"
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

export default AppInput;
