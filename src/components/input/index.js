import "./index.css";

function Input({
  label,
  type,
  placeholder,
  name,
  id,
  required,
  value,
  onChange,
  error,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>
        <b>{label}</b>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        style={error ? { marginBottom: 0 } : {}}
      />
      {error && (
        <div className="password-not-match-error">
          <p>Re-enter password does not match</p>
        </div>
      )}
    </div>
  );
}

export default Input;
