
import React, { useState, useEffect } from "react";
import { getUrls ,searchUrl} from "../../apis/link"; 
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Drawer from "../../components/drawer/Edit";
import Modal from "../../components/modals/Modals";
import { deleteUrlById } from "../../apis/link"; 
import styles from "./Links.module.css";

const Links = () => {
  const [data, setData] = useState([]); 
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [statusSortOrder, setStatusSortOrder] = useState("asc"); 
  const [search, setSearch]= useState("");
  console.log(search);
  console.log(data);
  const formatDateInIST = (isoDateString) => {
    const date = new Date(isoDateString); 
    const options = {
      timeZone: "Asia/Kolkata", 
      year: "numeric",
      month: "short", 
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false, 
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
    if (search.length > 0) {
      getSearchLinks(search);
    } else {
      fetchLinks();
    }
  }, [search]);

  const fetchLinks = async (page = 1) => {
    try {
      const response = await getUrls(page);
      const { urls, pagination: paginationData } = response.data;

      setData(urls); 
      setPagination({
        currentPage: paginationData.currentPage,
        totalPages: paginationData.totalPages,
      });
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
    

  const getSearchLinks = async ( search ) => {
    try {
      const response = await searchUrl( search); 
      const { urls, pagination: paginationData } = response.data;

      setData(urls);
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
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
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
    setSelectedRow(row); 
    setIsModalOpen(true); 
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleConfirmDelete = async (id) => {
    try {
     
      await deleteUrlById(id);
      setData((prevData) => prevData.filter((row) => row._id !== id));
  
      console.log("Deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Failed to delete the link. Please try again.");
    } finally {
      setIsModalOpen(false); 
      setSelectedRow(null); 
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
    setSelectedRow(row); 
    setIsDrawerOpen(true); 
  };
 

  return (
    <div className={styles.link}>
      <Sidebar />
      <div className={styles.main}>
        <Header search={search} setSearch={setSearch}/>
        <div className={styles.pages}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  Date{" "}
                  <img
                    src="/sorticon.png"
                    alt="sorting"
                    className={styles.dateSortIcon}
                    onClick={handleSortByDate} 
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
                    onClick={handleSortByStatus} 
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
                  <td>{row.original_url.length > 30 ? row.original_url.slice(0,30)  : row.original_url}</td>

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
          </div>
          <div className={styles.pagination}>
  {/* Previous Arrow */}
  <button
    className={`${styles.arrowButton} ${pagination.currentPage === 1 ? styles.disabled : ''}`}
    onClick={() => fetchLinks(pagination.currentPage - 1)}
    disabled={pagination.currentPage === 1}
  >
    ←
  </button>

  {/* Page Number Bullets */}
  {[...Array(pagination.totalPages)].map((_, index) => (
    <span
      key={index}
      className={`${styles.pageNumber} ${pagination.currentPage === index + 1 ? styles.active : ''}`}
      onClick={() => fetchLinks(index + 1)}
    >
      {index + 1}
    </span>
  ))}

  {/* Next Arrow */}
  <button
    className={`${styles.arrowButton} ${pagination.currentPage === pagination.totalPages ? styles.disabled : ''}`}
    onClick={() => fetchLinks(pagination.currentPage + 1)}
    disabled={pagination.currentPage === pagination.totalPages}
  >
    →
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












