import axios from "axios";
import React, { useState } from "react";
import HearderComp from "../HeaderComp/HeaderComp";
import styles from "./QrEdit.module.css";

const QrEdit = (props) => {
  //기존 이름
  const title = props.selectedQrName;
  //바뀔 이름
  const [selectedQrName, setSelectedQrName] = useState(props.selectedQrName);
  const onUpdateHandler = () => {
    if (selectedQrName === "") {
      alert("이름 입력해잇!");
    } else if (selectedQrName === title) {
      alert("수정 성공잇");
      props.changeQrEditState();
    } else {
      const updateData = {
        title: title,
        newTitle: selectedQrName,
      };
      axios
        .put(process.env.REACT_APP_API_URL + "/QrList", updateData, {
          headers: {
            Authorization: sessionStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("수정 성공잇");
            props.changeQrEditState();
          } else {
            alert("수정 실패잇");
            console.log("QrList U : status가 200아님");
          }
        })
        .catch((err) => {
          console.log("QrList U : err났어잇");
          console.log(err);
        });
      props.changeQrEditState();
    }
  };
  const onTitleHandler = (e) => {
    setSelectedQrName(e.target.value);
  };

  return (
    <>
      <HearderComp headertitle="QR 수정" headerColor="yellow"></HearderComp>
      <div className={styles.qr_name_input_box}>
        <input
          className={styles.qr_name_input}
          type="text"
          placeholder="QR 이름"
          value={selectedQrName}
          defaultValue={selectedQrName}
          onChange={onTitleHandler}
        />
      </div>
      <div className={styles.button_box}>
        <button
          className={styles.qr_edit_delete_button}
          onClick={props.changeQrEditState}
        >
          삭제
        </button>

        <button className={styles.qr_edit_button} onClick={onUpdateHandler}>
          수정
        </button>
      </div>
    </>
  );
};

export default QrEdit;
