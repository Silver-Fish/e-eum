import React, { useState, useEffect } from "react";
import HeaderComp from "../../components/HeaderComp/HeaderComp";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";
import { useCookies } from "react-cookie";
const Confirm = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");

  const [cookies] = useCookies(["cookie"]);

  useEffect(() => {
    if (
      sessionStorage.getItem("jwt") === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== "undefined"
    ) {
      history.push("/");
    } else if (
      sessionStorage.getItem("jwt") === null &&
      (cookies.cookie === undefined || cookies.cookie === "undefined")
    ) {
      history.push("/");
    }
  });

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const passwordRequest = {
      password: password,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + "/accounts/check-pw",
        passwordRequest,
        {
          headers: {
            Authorization: sessionStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data) {
          history.push("./userDelete");
        } else {
          alert("비밀번호가 틀렸습니다");
        }
      })
      .catch((err) => {
        alert("비밀번호 확인 중에 발생했습니다. 잠시 후에 다시 시도해주세요.");
      });
  };

  return (
    <div className={styles.password_confirm_box}>
      <HeaderComp headertitle="비밀번호 확인" />

      <form className={styles.MainForm} onSubmit={onSubmitHandler}>
        <div className={styles.password_box}>
          <input
            className={styles.input_password_confirm}
            type="password"
            placeholder="비밀번호 확인"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>

        <button className={styles.check_button} type="submit">
          확인
        </button>

        <button
          className={styles.cancel_button}
          onClick={() => {
            history.push("/mypage");
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default Confirm;
