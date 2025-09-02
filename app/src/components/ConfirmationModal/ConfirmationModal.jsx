
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  title,
  text,
  confirmText = "Potvrdi",
  onCancel,
  onConfirm,
  cancelText = "PONISTI",
  errorText
}) => {

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{text}</p>
        {errorText && (<span className="error-text">{errorText}</span>)}
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onCancel}>{cancelText}</button>
          <button className="modal-btn confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;