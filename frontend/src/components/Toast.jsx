function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div
      className={`toast toast-${toast.type || "success"}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-message">{toast.message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;
