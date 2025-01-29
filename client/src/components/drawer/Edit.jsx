
/*import React, { useState, useEffect } from "react";
import { editLink } from "../../apis/link"; // Import the editLink function
import styles from "./Edit.module.css";

const Edit = ({ toggleDrawer, isOpen, selectedRow, fetchLinks }) => {
  const [input, setInput] = useState({
    destinationUrl: "",
    remarks: "",
    linkExp: false,
    date: "",
  });

  // Update fields when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      setInput({
        destinationUrl: selectedRow.original_url || "",
        remarks: selectedRow.remarks || "",
        linkExp: !!selectedRow.expirationdate, // Set true if expiration date exists
        date: selectedRow.expirationdate
          ? new Date(selectedRow.expirationdate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [selectedRow]);

  // Handle the checkbox change
  const handleCheckboxChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      linkExp: e.target.checked,
    }));
  };

  // Clear all fields
  const clearFields = () => {
    setInput({
      destinationUrl: "",
      remarks: "",
      linkExp: false,
      date: "",
    });
  };

  // Save the updated link
  const handleSave = async () => {
    if (!selectedRow) {
      return; // No row selected
    }

    const updatedData = {
      original_url: input.destinationUrl,
      remarks: input.remarks,
      expirationdate: input.linkExp ? input.date : null, // Send null if the checkbox is unchecked
    };

    try {
      await editLink(selectedRow._id, updatedData); // Call the API
      fetchLinks(); // Refresh the data in the table
      toggleDrawer(); // Close the drawer
    } catch (error) {
      console.error("Failed to save link:", error);
    }
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.drawerHeader}>
        <h4>Edit Link</h4>
        <button onClick={toggleDrawer}>X</button>
      </div>

      <div className={styles.drawerBody}>
        <form>
          <div>
            <label htmlFor="title">
              Destination Url <span>*</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              required
              value={input.destinationUrl}
              onChange={(e) =>
                setInput({ ...input, destinationUrl: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="url">
              Remarks <span>*</span>
            </label>
            <textarea
              id="url"
              placeholder="Remarks"
              required
              value={input.remarks}
              onChange={(e) =>
                setInput({ ...input, remarks: e.target.value })
              }
            />
          </div>

          <div className={styles.linkExp}>
            <label htmlFor="linkexp">Link expiration</label>
            <input
              type="checkbox"
              name="linkexp"
              id="linkexp"
              checked={input.linkExp}
              onChange={handleCheckboxChange}
            />
          </div>

          
          {input.linkExp && (
            <div>
              <input
                type="date"
                id="date"
                value={input.date}
                onChange={(e) =>
                  setInput({ ...input, date: e.target.value })
                }
              />
            </div>
          )}
        </form>
      </div>

      <div className={styles.drawerFooter}>
        <button className={styles.clearButton} onClick={clearFields}>
          Clear
        </button>
        <button className={styles.createButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;*/
import React, { useState, useEffect } from "react";
import { editLink } from "../../apis/link"; // Import the editLink function
import styles from "./Edit.module.css";

const Edit = ({ toggleDrawer, isOpen, selectedRow, fetchLinks }) => {
  const [input, setInput] = useState({
    destinationUrl: "",
    remarks: "",
    linkExp: false,
    date: "",
  });

  // Update fields when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      setInput({
        destinationUrl: selectedRow.original_url || "",
        remarks: selectedRow.remarks || "",
        linkExp: !!selectedRow.expirationdate, // Set true if expiration date exists
        date: selectedRow.expirationdate
          ? new Date(selectedRow.expirationdate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [selectedRow]);

  // Handle the checkbox change
  const handleCheckboxChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      linkExp: e.target.checked,
    }));
  };

  // Clear all fields
  const clearFields = () => {
    setInput({
      destinationUrl: "",
      remarks: "",
      linkExp: false,
      date: "",
    });
  };

  // Save the updated link
  const handleSave = async () => {
    if (!selectedRow) {
      return; // No row selected
    }

    const updatedData = {
      original_url: input.destinationUrl,
      remarks: input.remarks,
      expirationdate: input.linkExp ? input.date : null, // Send null if the checkbox is unchecked
    };

    try {
      await editLink(selectedRow._id, updatedData); // Call the API
      if (fetchLinks && typeof fetchLinks === "function") {
        fetchLinks(); // Refresh the data in the table
      } else {
        console.error("fetchLinks is not a valid function");
      }
      toggleDrawer(); // Close the drawer
    } catch (error) {
      console.error("Failed to save link:", error);
    }
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.drawerHeader}>
        <h4>Edit Link</h4>
        <button onClick={toggleDrawer}>X</button>
      </div>

      <div className={styles.drawerBody}>
        <form>
          <div>
            <label htmlFor="title">
              Destination Url <span>*</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              required
              value={input.destinationUrl}
              onChange={(e) =>
                setInput({ ...input, destinationUrl: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="url">
              Remarks <span>*</span>
            </label>
            <textarea
              id="url"
              placeholder="Remarks"
              required
              value={input.remarks}
              onChange={(e) =>
                setInput({ ...input, remarks: e.target.value })
              }
            />
          </div>

          <div className={styles.linkExp}>
            <label htmlFor="linkexp">Link expiration</label>
            <input
              type="checkbox"
              name="linkexp"
              id="linkexp"
              checked={input.linkExp}
              onChange={handleCheckboxChange}
            />
          </div>

          {/* Conditionally render the date input based on checkbox */}
          {input.linkExp && (
            <div>
              <input
                type="date"
                id="date"
                value={input.date}
                onChange={(e) =>
                  setInput({ ...input, date: e.target.value })
                }
              />
            </div>
          )}
        </form>
      </div>

      <div className={styles.drawerFooter}>
        <button className={styles.clearButton} onClick={clearFields}>
          Clear
        </button>
        <button className={styles.createButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;



