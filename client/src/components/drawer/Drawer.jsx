
import React, { useState } from "react";
import { createShortenedLink } from "../../apis/link"; // Import the API function
import styles from "./Drawer.module.css";
import { toast } from "react-toastify";

const Drawer = ({ toggleDrawer, isOpen }) => {
  const [input, setInput] = useState({
    destinationUrl: "",
    remarks: "",
    linkExp: false,
    date: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [inputError, setInputError] = useState({
    destinationUrl: false,
    remarks: false,
  }); // Input error state

  const handleCheckboxChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      linkExp: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { destinationUrl, remarks, date, linkExp } = input;

    // Validate inputs
    const destinationUrlError = !destinationUrl.trim();
    const remarksError = !remarks.trim();

    // Update input error states
    setInputError({
      destinationUrl: destinationUrlError,
      remarks: remarksError,
    });

    // Validation check for mandatory fields
    if (destinationUrlError || remarksError) {
      setLoading(false);
      toast.error("Destination URL and Remarks fields are mandatory!");
      return;
    }

    const requestData = {
      original_url: destinationUrl,
      remarks,
      expirationdate: linkExp ? date : null,
    };

    try {
      const response = await createShortenedLink(requestData);
      toast.success(response.msg || "Short URL created successfully!");
      setInput({
        destinationUrl: "",
        remarks: "",
        linkExp: false,
        date: "",
      });
      setInputError({
        destinationUrl: false,
        remarks: false,
      }); // Reset errors after success
    } catch (err) {
      toast.error(err.msg || "Failed to create short URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.drawerHeader}>
        <h4>New Link</h4>
        <button onClick={toggleDrawer}>X</button>
      </div>

      <div className={styles.drawerBody}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="destinationUrl">
              Destination Url <span>*</span>
            </label>
            <input
              type="text"
              id="destinationUrl"
              placeholder="Enter Destination URL"
              required
              className={`${styles.input} ${
                inputError.destinationUrl ? styles.errorInput : ""
              }`}
              value={input.destinationUrl}
              onChange={(e) =>
                setInput({ ...input, destinationUrl: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="remarks">
              Remarks <span>*</span>
            </label>
            <textarea
              id="remarks"
              placeholder="Enter Remarks"
              required
              className={`${styles.textarea} ${
                inputError.remarks ? styles.errorInput : ""
              }`}
              value={input.remarks}
              onChange={(e) => setInput({ ...input, remarks: e.target.value })}
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
                onChange={(e) => setInput({ ...input, date: e.target.value })}
              />
            </div>
          )}

          {loading && <p>Loading...</p>}
        </form>
      </div>

      <div className={styles.drawerFooter}>
        <button
          className={styles.clearButton}
          onClick={() =>
            setInput({ destinationUrl: "", remarks: "", linkExp: false, date: "" })
          }
        >
          Clear
        </button>
        <button
          className={styles.createButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create New"}
        </button>
      </div>
    </div>
  );
};

export default Drawer;




