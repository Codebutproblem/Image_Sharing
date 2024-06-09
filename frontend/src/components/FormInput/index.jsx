function FormInput({ label, name, type, placeholder, required=true, defaultValue="", readOnly=false, inputRef=null}) {
  return (
    <>
      <label className="block text-sm font-medium text-slate-50">
        {label}
      </label>
      <input
        ref={inputRef}
        name={name}
        type={type}
        className="mt-1 min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm text-black"
        placeholder={placeholder}
        required = {required}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </>
  );
}

export default FormInput;