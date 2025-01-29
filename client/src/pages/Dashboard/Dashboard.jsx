
/*import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const dateWiseData = [
    { date: "21-01-25", clicks: 1234 },
    { date: "20-01-25", clicks: 1140 },
    { date: "19-01-25", clicks: 134 },
    { date: "18-01-25", clicks: 34 },
  ];

  const deviceWiseData = [
    { device: "Mobile", clicks: 134 },
    { device: "Desktop", clicks: 40 },
    { device: "Tablet", clicks: 3 },
  ];

  return (
    <div className={styles.dashboard}>
      
      <Sidebar />
      
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.pageContent}>
            <div className={styles.totalClicksWrapper}>
              <h2>Total Clicks</h2>
              <span className={styles.totalClicks}>1234</span>
            </div>
            <div className={styles.charts}>
              
              <div className={styles.chart}>
                <h3>Date-wise Clicks</h3>
                <ResponsiveContainer width="100%" height={160}>
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
                        content={({ x, y, value }) => (
                          <text
                           // x="right"// Fixed X-position for alignment
                            y={y + 5}
                            fill="#000"
                            fontSize="16px"
                            textAnchor="end"
                          >
                            {value}
                          </text>
                        )}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

             
              <div className={styles.chart}>
                <h3>Click Devices</h3>
                <ResponsiveContainer width="100%" height={120}>
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
                        content={({ x, y, value }) => (
                          <text
                            x={450} // Fixed X-position for alignment
                            y={y + 5}
                            fill="#000"
                            fontSize="16px"
                            textAnchor="end"
                          >
                            {value}
                          </text>
                        )}
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
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
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
  const dateWiseData = [
    { date: "21-01-25", clicks: 1234 },
    { date: "20-01-25", clicks: 1140 },
    { date: "19-01-25", clicks: 134 },
    { date: "18-01-25", clicks: 34 },
  ];

  const deviceWiseData = [
    { device: "Mobile", clicks: 134 },
    { device: "Desktop", clicks: 40 },
    { device: "Tablet", clicks: 3 },
  ];

  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.pageContent}>
            <div className={styles.totalClicksWrapper}>
              <h2>Total Clicks</h2>
              <span className={styles.totalClicks}>1234</span>
            </div>
            <div className={styles.charts}>
              {/* Date-wise Clicks Chart */}
              <div className={styles.chart}>
                <h3>Date-wise Clicks</h3>
                <ResponsiveContainer width="100%" height={160}>
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
                      {/* Use LabelList without fixed x position */}
                      <LabelList
                        dataKey="clicks"
                        position="right" // Places the labels on the right of the bars
                        style={{ fill: "#000", fontSize: "16px" }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Click Devices Chart */}
              <div className={styles.chart}>
                <h3>Click Devices</h3>
                <ResponsiveContainer width="100%" height={120}>
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
                      {/* Use LabelList without fixed x position */}
                      <LabelList
                        dataKey="clicks"
                        position="right" // Places the labels on the right of the bars
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

export default Dashboard;



