import React from "react";

const InputField = ({ label, type, placeholder, value, name, onChange }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
