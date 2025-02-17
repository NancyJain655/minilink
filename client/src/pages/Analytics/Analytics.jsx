
/*import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getUserLinksWithAnalytics } from "../../apis/link";
import styles from "./Analytics.module.css";

const Analytics = () => {
  const [links, setLinks] = useState([]);
  const [sortedClicks, setSortedClicks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total pages
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserLinksWithAnalytics(token, currentPage,7);
      if (data) {
        setLinks(data.urls);
        setSortedClicks(
          data.urls.flatMap((link) =>
            link.clicks.map((click) => ({ ...click, original_url: link.original_url, shortened_url: link.shortened_url }))
          )
        );
        setTotalPages(data.pagination.totalPages); // Set total pages from backend response
      }
    };
    fetchData();
  }, [currentPage, token]);

  const handleSort = () => {
    const sortedData = [...sortedClicks].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    });
    setSortedClicks(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.analytics}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  Timestamp <img src="/sorticon.png" alt="sort" className={styles.sortIcon} />
                </th>
                <th>Original Link</th>
                <th>Short Link</th>
                <th>IP Address</th>
                <th>User Device</th>
              </tr>
            </thead>
            <tbody>
              {sortedClicks.map((click, index) => (
                <tr key={index}>
                  <td>
                    {new Date(click.timestamp).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td>{click.original_url.length>30? click.original_url.slice(0,30):click.original_url}</td>
                  <td>{`https://minilink-e3fc.onrender.com/api/link/${click.shortened_url}`.slice(0,55)}</td>
                  <td>{click.ipAddress}</td>
                  <td>{click.os}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;*/
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getUserLinksWithAnalytics } from "../../apis/link";
import styles from "./Analytics.module.css";

const Analytics = () => {
  const [links, setLinks] = useState([]);
  const [sortedClicks, setSortedClicks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total pages
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserLinksWithAnalytics(token, currentPage, 7);
      if (data) {
        setLinks(data.urls);
        setSortedClicks(
          data.urls.flatMap((link) =>
            link.clicks.map((click) => ({ ...click, original_url: link.original_url, shortened_url: link.shortened_url }))
          )
        );
        setTotalPages(data.pagination.totalPages); // Set total pages from backend response
      }
    };
    fetchData();
  }, [currentPage, token]);

  const handleSort = () => {
    const sortedData = [...sortedClicks].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    });
    setSortedClicks(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageNumber} ${currentPage === i ? styles.activePage : ""}`}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.analytics}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  Timestamp <img src="/sorticon.png" alt="sort" className={styles.sortIcon} />
                </th>
                <th>Original Link</th>
                <th>Short Link</th>
                <th>IP Address</th>
                <th>User Device</th>
              </tr>
            </thead>
            <tbody>
              {sortedClicks.map((click, index) => (
                <tr key={index}>
                  <td>
                    {new Date(click.timestamp).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td>{click.original_url.length > 30 ? click.original_url.slice(0, 30) : click.original_url}</td>
                  <td>{`https://minilink-e3fc.onrender.com/api/link/${click.shortened_url}`.slice(0, 55)}</td>
                  <td>{click.ipAddress}</td>
                  <td>{click.os}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className={styles.arrowButton}
            >
              ←
            </button>
            <div className={styles.pageNumbers}>{generatePageNumbers()}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={styles.arrowButton}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;




