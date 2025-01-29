import React from "react";
import styles from "./Delete.module.css"; // Create this CSS file separately

const Delete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>Are you sure, you want to delete it?</p>
        <div className={styles.modalActions}>
          <button className={styles.noBtn} onClick={onClose}>
            No
          </button>
          <button className={styles.yesBtn} onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
