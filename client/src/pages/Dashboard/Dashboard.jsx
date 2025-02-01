/*import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getDashboardAnalytics } from "../../apis/link"; // Import API function
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [dateWiseData, setDateWiseData] = useState([]);
  const [deviceWiseData, setDeviceWiseData] = useState([]);

  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardAnalytics(token);
      if (data) {
        setTotalClicks(data.totalClicks);

        // Convert date-wise clicks object into array for Recharts
        const dateDataArray = Object.keys(data.dateWiseClicks).map((date) => ({
          date,
          clicks: data.dateWiseClicks[date],
        }));
        setDateWiseData(dateDataArray);

        // Convert device type clicks object into array for Recharts
        const deviceDataArray = [
          { device: "Mobile", clicks: data.deviceTypeClicks.mobile },
          { device: "Desktop", clicks: data.deviceTypeClicks.desktop },
          { device: "Tablet", clicks: data.deviceTypeClicks.tablet },
        ];
        setDeviceWiseData(deviceDataArray);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.pageContent}>
            <div className={styles.totalClicksWrapper}>
              <h2>Total Clicks</h2>
              <span className={styles.totalClicks}>{totalClicks}</span>
            </div>
            <div className={styles.charts}>
              
              <div className={styles.chart}>
                <h3>Date-wise Clicks</h3>
               <ResponsiveContainer width="100%" height={Math.max( dateWiseData.length * 40)}>


                  <BarChart
                    data={dateWiseData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="date"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tick={{ fill: "#000", fontSize: 16 }}
                    />
                    <Bar dataKey="clicks" fill="#1B48DA" barSize={15}>
                      <LabelList
                        dataKey="clicks"
                        position="right"
                        style={{ fill: "#000", fontSize: "16px" }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

             
              <div className={styles.chart}>
                <h3>Click Devices</h3>
                
                <ResponsiveContainer width="100%" height={Math.max( deviceWiseData.length * 40)}>
                  <BarChart
                    data={deviceWiseData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="device"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tick={{ fill: "#000", fontSize: 16 }}
                    />
                    <Bar dataKey="clicks" fill="#1B48DA" barSize={15}>
                      <LabelList
                        dataKey="clicks"
                        position="right"
                        style={{ fill: "#000", fontSize: "16px" }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;*/
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { getDashboardAnalytics } from "../../apis/link"; // Import API function
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [dateWiseData, setDateWiseData] = useState([]);
  const [deviceWiseData, setDeviceWiseData] = useState([]);

  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardAnalytics(token);
      if (data) {
        setTotalClicks(data.totalClicks);

        // Convert date-wise clicks object into array for Recharts
        const dateDataArray = Object.keys(data.dateWiseClicks).map((date) => ({
          date,
          clicks: data.dateWiseClicks[date],
        }));
        setDateWiseData(dateDataArray);

        // Convert device type clicks object into array for Recharts
        const deviceDataArray = [
          { device: "Mobile", clicks: data.deviceTypeClicks.mobile },
          { device: "Desktop", clicks: data.deviceTypeClicks.desktop },
          { device: "Tablet", clicks: data.deviceTypeClicks.tablet },
        ];
        setDeviceWiseData(deviceDataArray);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.pageContent}>
            <div className={styles.totalClicksWrapper}>
              <h2>Total Clicks</h2>
              <span className={styles.totalClicks}>{totalClicks}</span>
            </div>
            <div className={styles.charts}>
              <div className={styles.chart}>
                <h3>Date-wise Clicks</h3>
                <ResponsiveContainer width="100%" height={Math.max(dateWiseData.length * 40)}>
                  <BarChart
                    data={dateWiseData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="date"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tick={{ fill: "#000", fontSize: 16 }}
                    />
                    <Bar dataKey="clicks" fill="#1B48DA" barSize={15}>
                      <LabelList dataKey="clicks" position="right" style={{ fill: "#000", fontSize: "16px" }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={styles.chart}>
                <h3>Click Devices</h3>
                <ResponsiveContainer width="100%" height={Math.max(deviceWiseData.length * 40)}>
                  <BarChart
                    data={deviceWiseData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="device"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      tick={{ fill: "#000", fontSize: 16 }}
                    />
                    <Bar dataKey="clicks" fill="#1B48DA" barSize={15}>
                      <LabelList dataKey="clicks" position="right" style={{ fill: "#000", fontSize: "16px" }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;








