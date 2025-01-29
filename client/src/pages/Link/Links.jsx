
import React, { useState, useEffect } from "react";
import { getUrls } from "../../apis/link"; // Import the API function
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Drawer from "../../components/drawer/Edit";
import Modal from "../../components/modals/Modals";
import { deleteUrlById } from "../../apis/link"; // Import the delete API function
import styles from "./Links.module.css";

const Links = () => {
  const [data, setData] = useState([]); // State for table data
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const [statusSortOrder, setStatusSortOrder] = useState("asc"); // State for status sorting order

  // Helper function for formatting date
  const formatDateInIST = (isoDateString) => {
    const date = new Date(isoDateString); // Parse the ISO date string
    const options = {
      timeZone: "Asia/Kolkata", // Indian Standard Time
      year: "numeric",
      month: "short", // e.g., Jan
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false, // 24-hour format
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Helper function to determine status dynamically
  const getStatus = (expirationdate) => {
    const currentDate = new Date();
    const expiryDate = expirationdate ? new Date(expirationdate) : null;
  
    return !expiryDate || expiryDate > currentDate ? "Active" : "Inactive";
  };
  

  // Fetch links on component mount
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async (page = 1) => {
    try {
      const response = await getUrls(page);
      const { urls, pagination: paginationData } = response.data;

      setData(urls); // Set the initial data
      setPagination({
        currentPage: paginationData.currentPage,
        totalPages: paginationData.totalPages,
      });
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleSortByDate = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setData(sortedData); // Update the data state with sorted data
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle the sort order
  };

  const handleSortByStatus = () => {
    const sortedData = [...data].sort((a, b) => {
      const statusA = getStatus(a.expirationdate);
      const statusB = getStatus(b.expirationdate);

      if (statusSortOrder === "asc") {
        return statusA === "Active" && statusB === "Inactive" ? -1 : 1;
      } else {
        return statusA === "Inactive" && statusB === "Active" ? -1 : 1;
      }
    });

    setData(sortedData); // Update the data state with sorted data
    setStatusSortOrder(statusSortOrder === "asc" ? "desc" : "asc"); // Toggle the sort order
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row); // Store the row to be deleted
    setIsModalOpen(true); // Open the modal
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleConfirmDelete = async (id) => {
    try {
      // Call API to delete the URL
      await deleteUrlById(id);
  
      // Remove the deleted row from the table
      setData((prevData) => prevData.filter((row) => row._id !== id));
  
      console.log("Deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Failed to delete the link. Please try again.");
    } finally {
      setIsModalOpen(false); // Close the modal
      setSelectedRow(null);  // Reset the selected row
    }
  };

  const handleCopyClick = (shortLink) => {
    navigator.clipboard.writeText(`https://minilink-e3fc.onrender.com/api/link/${shortLink}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row); // Save the selected row data
    setIsDrawerOpen(true); // Open the drawer
  };

  return (
    <div className={styles.link}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  Date{" "}
                  <img
                    src="/sorticon.png"
                    alt="sorting"
                    className={styles.dateSortIcon}
                    onClick={handleSortByDate} // Add click handler for sorting
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>Original Link</th>
                <th>Short Link</th>
                <th>Remarks</th>
                <th>Clicks</th>
                <th>
                  Status{" "}
                  <img
                    src="/sorticon.png"
                    alt="sorting"
                    className={styles.sortIcon}
                    onClick={handleSortByStatus} // Add click handler for sorting status
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{formatDateInIST(row.createdAt)}</td>
                  <td>{row.original_url}</td>
                  <td>
                  {`https://minilink-e3fc.onrender.com/api/link/${row.shortened_url}`.slice(0,9)}
                    <img
                      src="/copyicon.png"
                      alt="copy logo"
                      className={styles.copyIcon}
                      onClick={() => handleCopyClick(row.shortened_url)}
                    />
                  </td>
                  <td>{row.remarks}</td>
                  <td>{row.clicks.length}</td>
                  <td
                    className={
                      getStatus(row.expirationdate) === "Active"
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    {getStatus(row.expirationdate)}
                  </td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEditClick(row)}
                    >
                      <img src="/edit.png" alt="edit" className={styles.editIcon}/>
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteClick(row)}
                    >
                       <img src="/deleteicon.png" alt="Delete" className={styles.deleteIcon}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={() => fetchLinks(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchLinks(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next
            </button>
          </div>

          {/* Copy Notification */}
          {isCopied && (
            <div className={styles.copyNotification}>
              <img src="/tickicon.png" alt="tick" className={styles.tickIcon} />
              <span>Link copied</span>
            </div>
          )}

          {/* Drawer */}
          <Drawer
            toggleDrawer={toggleDrawer}
            isOpen={isDrawerOpen}
            selectedRow={selectedRow} // Pass the selected row data
          />

          {/* Modal */}
          <Modal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onConfirm={() => handleConfirmDelete(selectedRow._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Links;












