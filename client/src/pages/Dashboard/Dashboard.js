import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import WeekApexChart from "../../components/BarChart/WeekApexChart";
import MonthApexChart from "../../components/BarChart/MonthApexChart";
import Piechart from "../../components/PieChart/PieChart";
import DashboardCalendar from "../../components/Calendar/Calendar";
import QRcodeManageDetail from "./../../components/QRmanageDetail/QRmanageDetail"

import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../store/dashboard";
import { getDashboard } from "./../../api/services/dashboard";
import { getBusinessId, getQRcodeInfo } from "../../api/services/createQrcode"
import moment from "moment";

const Dashboard = () => {
  const title = "대시보드";
  const dispatch = useDispatch();
  const [isBarChart, setIsBarChart] = useState(true);
  const [loading, setLoading] = useState(true);
  // const [businessIdget, setBusinessIdget] = useState(0);
  // const [qrcodeIdget, setQrcodeIdget] = useState(0);
  const businessIdSelector = useSelector(state => state.dashboard.businessId);
  const qrCodeIdSelector = useSelector(state => state.dashboard.qrCodeId);
  const timeSelector = useSelector(state => state.dashboard.time);

  // console.log("파라미터는?", window.location.pathname);
  // if (window.location.pathname === "/oauth2") {
  //   window.history.pushState("", "페이지타이틀", `/dashboard`);
  // }

  const weekBtnHandler = () => {
    setIsBarChart(true);
  };

  const monthBtnHandler = () => {
    setIsBarChart(false);
  };

  let today = moment().format("YYYYMMDD");

  const firstDataRendering = async () => {
    const resBusinessId = await getBusinessId()
    console.log(resBusinessId.businessId)
    const resQrcodeId = await getQRcodeInfo(resBusinessId.businessId)
    console.log(resQrcodeId)
    const resDashboardData = await getDashboard(resBusinessId.businessId, resQrcodeId[0].qrCodeId, today)
    console.log(resDashboardData)
    dispatch(dashboardActions.setMonth(resDashboardData.month));
    dispatch(dashboardActions.setWeek(resDashboardData.week));
    dispatch(dashboardActions.setTime(resDashboardData.time));
    setLoading(false)
  };

  useEffect(() => {
    firstDataRendering()
  }, [])

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main_container}>
        <Header title={title} />
        {loading === false &&
          <div>
            <div className={styles.flex_container}>
              <div className={styles.componentSector}>
                <div className={styles.component}>
                  <h3 className={styles.h3}>주간/월간 예약 현황</h3>
                  <div className={styles.componentEl}>
                    <div className={styles.barChartsBtn}>
                      <button onClick={weekBtnHandler}>Week</button>
                      <button onClick={monthBtnHandler}>Month</button>
                    </div>
                    <div>
                      {isBarChart ? (
                        <WeekApexChart className={styles.barChart} />
                      ) : (
                        <MonthApexChart className={styles.barChart} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.component}>
                <h3 className={styles.h3}>Calendar</h3>
                <div className={styles.componentEl__calendar}>
                  <DashboardCalendar className={styles.barChart} />
                </div>
              </div>
            </div>
            <div className={styles.flex_container}>
              <div className={styles.component}>
                {/* QR 코드 리스트는 QR코드 리스트 컴포넌트 연결(주영님 작업중) */}
                <h3 className={styles.h3}>QR 코드</h3>
                <div className={styles.componentEl__QR}>
                  <QRcodeManageDetail />
                </div>
              </div>
              <div className={styles.component}>
                <h3 className={styles.h3}>시간 별 예약 현황</h3>
                <div className={styles.componentEl__piechart}>
                  <Piechart />
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>
  );
}
export default Dashboard;
