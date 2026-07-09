import React, { useEffect } from "react";
import styles from "../../styles/common/ConfirmModal.module.css";

// Reusable Confirmation Modal component
function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  // Close modal when pressing the Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && open) {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  // Close modal when clicking the backdrop (outside the modal content)
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
