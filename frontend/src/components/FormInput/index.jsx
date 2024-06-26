function FormInput({
  label,
  name,
  type,
  placeholder,
  required = true,
  defaultValue = "",
  readOnly = false,
  inputRef = null,
}) {
  return (
    <>
      <label className="block text-sm font-medium">{label}</label>
      <input
        ref={inputRef}
        name={name}
        type={type}
        className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:text-orange-400 text-slate-50 sm:text-s bg-transparent font-bold"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        readOnly={readOnly}
        autoComplete="off"
      />
    </>
  );
}

export default FormInput;
