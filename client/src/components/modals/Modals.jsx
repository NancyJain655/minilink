
/*import React from "react";
import { deleteUrlById } from "../../apis/link"; // Import delete API function
import styles from "./Modals.module.css"; // Ensure you have this CSS file

const Modal = ({ isOpen, onClose, onConfirm, selectedRow }) => {
  const handleDelete = async () => {
    if (!selectedRow) return;

    try {
      // Call the API to delete the selected row
      const response = await deleteUrlById(selectedRow._id);
      console.log("Delete response:", response);

      // Call the parent function to update UI after deletion
      onConfirm(selectedRow._id);
    } catch (error) {
      console.error("Error while deleting link:", error);
      alert("Failed to delete the link. Please try again.");
    } finally {
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>Are you sure you want to remove this link?</p>
        <div className={styles.modalActions}>
          <button className={styles.noBtn} onClick={onClose}>
            No
          </button>
          <button className={styles.yesBtn} onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;*/

import React from "react";
import styles from "./Modals.module.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>Are you sure you want to remove this link?</p>
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

export default Modal;


