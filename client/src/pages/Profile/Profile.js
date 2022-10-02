import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileEditModal from "../../components/profileEditModal/ProfileEditModal";
import React, { useEffect, useState } from 'react';
import styles from "./Profile.module.css";
import noneProfile from "../../Img/Asset_5.png";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../src/api/services/user";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
// import { profileImgActions } from "../../store/profileImg";
// import user from "../../store/user";


const Profile = () => {
  // const profile = useSelector(state => state.user.userProfile)
  const [userInfo, setUserInfo] = useState({})
  const [isModal, setIsModal] = useState(true);
  const navigate = useNavigate();
  const title = "프로필"

  const dispatch = useDispatch();

  const openModal = () => {
    setIsModal(!isModal);
  }

  useEffect(() => {
    getProfile()
      .then(userData => {
        console.log(userData)
        setUserInfo(userData);
      })
      .catch(err => {
        if (err.response.data.status === 401) {
          alert("로그인 해주세요!")
        }
        navigate("/login")
      })
  }, [])
  // dispatch(profileImgActions.ImgSubmit(userInfo.profileImg))

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main_container}>
        <Header title={title} />
        {isModal ?
          <div className={styles.profile_container}>
            <div className={styles.contents_container}>
              <div className={styles.imgWrapper}>
                {userInfo.profileImg === null || userInfo.profileImg === undefined ?
                  <img alt="나는 없는 이미지" src={noneProfile} /> :
                  <img src={"http://localhost:8080" + userInfo.profileImg} className={styles.imgPreview} alt="나는 프로필" />}
              </div>
              <div className={styles.contents_info}>
                <div>
                  <div className={styles.contents_text}>관리자 명: {userInfo.name}</div>
                  <div className={styles.contents_text}>이메일: {userInfo.email}</div>
                  <div className={styles.contents_text}>전화번호: {userInfo.phone}</div>
                </div>
                <div>
                  <button onClick={openModal} className={styles.btn}>수 정</button>
                </div>
              </div>
            </div>
          </div>
          : <ProfileEditModal setIsModal={setIsModal} isModal={isModal} />
        }
      </div>
    </div>
  );
};
export default Profile;