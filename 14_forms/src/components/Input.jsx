export default function Input({ title, id, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{title}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
