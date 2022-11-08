import "./index.css";

function Input({
  label,
  type,
  placeholder,
  id,
  isDisable,
  formHook,
  error,
}) {
  return (
    <div className="input-wrapper">
      <label>
        <b>{label}</b>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        {...formHook}
        style={error ? { marginBottom: 0 } : {}}
        disabled={isDisable}
      />
      {error && (
        <div className="password-not-match-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
