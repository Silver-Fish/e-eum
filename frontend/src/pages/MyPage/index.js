import React, { useState, useEffect } from "react";
import UserButtonComp from "../../components/ButtonComp/UserButtonComp";
import HeaderComp from "../../components/HeaderComp/HeaderComp";
import styles from "./index.module.css";
import axios from "axios";
import LabelComp from "../../components/LabelComp/LabelComp";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
const MyPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checkLogin, setCheckLogin] = useState(sessionStorage.getItem("jwt"));
  const [cookies] = useCookies(["cookie"]);

  useEffect(() => {
    if (
      sessionStorage.getItem("jwt") === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== "undefined"
    ) {
      sessionStorage.setItem("jwt", cookies.cookie);
      setCheckLogin(sessionStorage.getItem("jwt"));
    } else if (
      sessionStorage.getItem("jwt") === null &&
      (cookies.cookie === undefined || cookies.cookie === "undefined")
    ) {
      history.push({
        pathname: '/login',
        state: { isBack: false }
      })
    }

    axios
      .get(process.env.REACT_APP_API_URL + "/accounts", {
        headers: {
          Authorization: sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
          setEmail(res.data.email);
        }
      })
      .catch((err) => {
        alert(
          "내정보를 불러오는 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요."
        );
      });
  }, [checkLogin, history, cookies.cookie]);
  return (
    <div className={styles.mypage_box}>
      <HeaderComp headertitle="내 정보" />

      <div className={styles.MainForm}>
        <div className={styles.input_box}>
          <div className={styles.name_box}>
            <span>이름:</span>
            <input readOnly placeholder={name}></input>
          </div>

          <div className={styles.email_box}>
            <span>이메일:</span>
            <input readOnly placeholder={email}></input>
          </div>
        </div>

        <div className={styles.button_box}>
          <UserButtonComp textValue="확인" handleClick="ok"></UserButtonComp>
        </div>

        <div className={styles.label_box}>
          <LabelComp textValue="회원탈퇴" handleClickPath="./confirm" />
          <LabelComp textValue="비밀번호 변경" handleClickPath="./userUpdate" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
