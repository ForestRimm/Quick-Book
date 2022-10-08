import React from "react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CreateQr.module.css";
import {
  postCreateQRCode,
  updateCreateQRCode,
  getBusinessId,
} from "./../../api/services/createQrcode";
import QRcodeManageDetail from "./../../components/QRmanageDetail/QRmanageDetail";
import { useDispatch, useSelector } from "react-redux";
import { qrcodeActions } from "../../store/qrCode";
import logo from "../../Img/logo.png";
import Modal from "../../components/Modal/Modal";

function CreateQr() {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const [body, setBody] = useState({
    target: "",
    businessName: "test",
    dueDate: new Date(),
    qrType: "reservation",
  });
  const [resData, setResData] = useState({});
  const [dueDateErr, setDueDateErr] = useState();
  const [valueDate, onChange] = useState();
  const [errMessage, setErrMessage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const qrcodeIdSelector = useSelector((state) => state.qrcode.qrCodeId);
  const businessIdSelector = useSelector((state) => state.qrcode.businessId);
  const qrcodeImgSelector = useSelector((state) => state.qrcode.qrcodeImg);
  const today = new Date();
  // console.log(today);

  // const GenerateQRCode = () => {
  //   QRCode.toDataURL(
  //     url,
  //     {
  //       width: 320,
  //       height: 320,
  //       color: {
  //         dark: "#000000",
  //         light: "#EEEEEEFF",
  //       },
  //     },
  //     (err, url) => {
  //       if (err) return console.error(err);
  //       setQr(url);
  //     }
  //   );
  // };

  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const CancelQRCode = () => {
    setUrl("");
    setQr("");
  };

  // const dueDataHandler = (e) => {
  //   if (valueDate <= today) {
  //     return setDueDateErr("오늘 이후의 날짜를 선택해주세요!")
  //   } else {
  //     setBody((prevState) => {
  //       return { ...prevState, target: e.target.value };
  //     })
  //   }
  // }

  const saveQRCode = async () => {
    const res = await postCreateQRCode(body);
    console.log(res.data.qrCodeId);
    // dispatch(qrcodeActions.setQrCodeId(res.data.qrCodeId))
    const resTwo = await getBusinessId();

    // dispatch(qrcodeActions.setBusinessId(resTwo.businessId))
    QRCode.toDataURL(
      `${window.location.origin}/business/${resTwo.businessId}/qr-code/${res.data.qrCodeId}`,
      {
        width: 320,
        height: 320,
        color: {
          dark: "#000000",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        setQr(url);
        const formData = new FormData();
        formData.append(
          "data",
          new Blob([JSON.stringify(body)], { type: "application/json" })
        );
        formData.append("file", dataURLtoBlob(url), "qr.png");
        console.log(dataURLtoBlob(url));
        console.log(formData.get("file"));
        updateCreateQRCode(formData, resTwo.businessId, res.data.qrCodeId)
          .then((res) => {
            console.log(res);
            dispatch(qrcodeActions.setQrcodeImg(res.qrCodeImg));
            dispatch(qrcodeActions.setTarget(res.target));
            dispatch(qrcodeActions.setDuedate(body.dueDate));
            // console.log(qrcodeImgSelector)
          })
          .catch((err) => {
            if (err.message === "FIELD ERROR") {
              return setErrMessage("QR 코드 명을 입력해주세요!");
            }
          });
        setOpenModal(true)
        setTimeout(() =>
        window.location.reload(), 1500)
      }
    );
  };

  useEffect(() => {
    // 첫 렌더링 때, getQrcode axios 요청에서 qrcodeImg 있으면 "이미 qr코드가 존재합니다"
    // 없으면 qrcode 생성 로직
  }, [])

  return (
    <div className={styles.qr__container}>
      <h3 className={styles.subTitle}>QR Code 생성</h3>
      <div className={styles.qr__contents__container}>
        <div className={styles.qr__row__container}>
          <img src={logo} alt="QRCode" className={styles.qr__logoImg} />
          <input
            className={styles.qr__input}
            type="text"
            placeholder="생성할 QR코드 명을 입력해주세요"
            value={body.target}
            onChange={(e) =>
              setBody((prevState) => {
                return { ...prevState, target: e.target.value };
              })
            }
          />
          <div className={styles.qr__alertMsg}>{dueDateErr}</div>
        </div>
        <div className={styles.qr__row__container}>
          <div className={styles.qr__infoTxt}>만료 기간을 선택해주세요</div>
          <Calendar
            className={styles.qr__calendar}
            onChange={(e) =>
              setBody((prevState) => {
                return {
                  ...prevState,
                  dueDate: new Date(e - new Date().getTimezoneOffset() * 60000),
                };
              })
            }
            value={body.dueDate}
          />
          <div>
            <button onClick={saveQRCode} className={styles.qr__btn}>
              생 성
            </button>
            <button onClick={CancelQRCode} className={styles.qr__btn}>
              취 소
            </button>
          </div>
        </div>
      </div>
      <h3 className={styles.subTitle}>QR Code 관리</h3>
      <div className={styles.qr__contents__container}>
        <QRcodeManageDetail />
        {openModal && <Modal num={11} />}
      </div>
    </div>
  );
}

export default CreateQr;
