import "./ErrorMessage.css";

const ErrorMessage = ({ children }) => {
  if (!children) return null;
  return (
    <div className="error-message">
      <strong>{children}</strong> 
    </div>
  );
}

export default ErrorMessage;