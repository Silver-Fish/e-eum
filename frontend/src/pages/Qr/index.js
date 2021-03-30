import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import HearderComp from "../../components/HeaderComp/HeaderComp";
import QrList from "../../components/Qr/QrList";
import QrRegister from "../../components/Qr/QrRegister";
import QrEdit from "../../components/Qr/QrEdit";
import axios from "axios";

const Qr = () => {
  const token = sessionStorage.getItem("jwt");
  const [qrs, setQrs] = useState([]);
  // const qrs = useState([
  //   ['스타벅스'], ['롯데리아'],['다이소'], ['편의점'], ['K치과']
  // ])[0]
  const [isQrResister, setQrResister] = useState(false);
  const [isQrEdit, setQrEdit] = useState(false);
  const [slectedQrName, setSlectedQrName] = useState("");

  // const data = useState([
  //   ["스타벅스"],
  //   ["롯데리아"],
  //   ["다이소"],
  //   ["편의점"],
  //   ["K치과"],
  // ])[0];
  useEffect(() => {
    //setQrs(data);
    axios
      .get(process.env.REACT_APP_API_URL + "/QrList", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setQrs(res.data);
        }
      })
      .catch((err) => {
        console.log("Qr리스트 받아오기 실패 ㅠㅠ");
        console.log(err);
      });
  });

  const changeQrResisterState = () => {
    setQrResister(!isQrResister);
  };

  const changeQrEditState = (data) => {
    setSlectedQrName(data[0]);
    setQrEdit(!isQrEdit);
  };

  // const selectedEditQrName = (data) => {
  //   setSlectedQrName(data)
  // }

  const qrLists = qrs.map((qr, i) => (
    <QrList key={i} qrName={qr} changeQrEditState={changeQrEditState}></QrList>
  ));

  return (
    <>
      {(function () {
        if (isQrResister !== true && isQrEdit !== true)
          return (
            <>
              <HearderComp
                headertitle="QR로 이음"
                headerColor="yello"
              ></HearderComp>
              <div className={styles.qr_list_box}>{qrLists}</div>

              <button
                className={styles.qr_register_box}
                onClick={changeQrResisterState}
              >
                등록
              </button>
            </>
          );
        if (isQrResister === true)
          return (
            <QrRegister
              changeQrResisterState={changeQrResisterState}
            ></QrRegister>
          );
        if (isQrEdit === true)
          return (
            <QrEdit
              changeQrEditState={changeQrEditState}
              slectedQrName={slectedQrName}
            ></QrEdit>
          );
      })()}
    </>
  );
};

export default Qr;
