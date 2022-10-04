import MenuInfo from "../../components/MenuInfo/MenuInfo.js";
import React from "react";
import SideBar from "../../components/Sidebar/Sidebar.js";
import StoreInfo from "../../components/StoreInfo/StoreInfo.js";
import styles from "./StoreManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessInfo } from "../../api/services/store.js";
import { useEffect, useState } from "react";
import { businessActions } from "../../store/business.js";
import { getMenuList } from "../../api/services/menu.js";

const StoreManagement = () => {
  // 매장정보를 가져와서 뿌려주는

  return (
    <main className={styles.container}>
      <SideBar />

      <div className={styles.StoreManagement}>
        <div className={styles.topNav}>
          <h1>매장관리</h1>
        </div>

        <StoreInfo />
        <MenuInfo />

        {/* {businessId && (
         
        )} */}
      </div>
    </main>
  );
};

export default StoreManagement;
