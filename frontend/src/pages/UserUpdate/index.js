import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeaderComp from "../../components/HeaderComp/HeaderComp";
import styles from "./index.module.css";
import { useCookies } from "react-cookie";
const UserUpdate = () => {
  const history = useHistory();
  const [cookies] = useCookies(["cookie"]);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");

  const onNewPasswordHandler = (e) => {
    setNewPassword(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordCheckHandler = (e) => {
    setPasswordCheck(e.currentTarget.value);
  };

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

    if (newpassword === "" && passwordcheck === "") setMessage("");
    else if (
      (passwordcheck !== "" && newpassword === "") ||
      (passwordcheck === "" && newpassword !== "")
    )
      setMessage("비밀번호를 입력해주세요");
    else if (passwordcheck === newpassword)
      setMessage("비밀번호가 일치합니다.");
    else if (passwordcheck !== newpassword)
      setMessage("비밀번호가 일치하지 않습니다.");
  }, [newpassword, passwordcheck, cookies.cookie, history]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newpassword === passwordcheck && newpassword !== "") {
      const userData = {
        currentPw: password,
        newPw: newpassword,
      };
      axios
        .put(process.env.REACT_APP_API_URL + "/accounts/update-pw", userData, {
          headers: {
            Authorization: sessionStorage.getItem("jwt"),
          },
        })
        .then((suc) => {
          if (suc.status === 200) {
            alert("비밀번호 변경이 완료되었습니다.");
            history.push("/myPage");
          } else {
            alert("비밀번호 변경을 실패했습니다.");
          }
        })
        .catch((err) => {
          alert("오류가 발생했습니다. 잠시 후에 다시 시도해주세요.");
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.password_change_box}>
      <HeaderComp headertitle="비밀번호 변경" />

      <form className={styles.MainForm} onSubmit={onSubmitHandler}>
        <div className={styles.password_box}>
          <input
            className={styles.input_password}
            value={password}
            type="password"
            placeholder="현재 비밀번호"
            onChange={onPasswordHandler}
          />
        </div>

        <div className={styles.change_password_box}>
          <input
            className={styles.input_change_password}
            value={newpassword}
            type="password"
            placeholder="변경할 비밀번호"
            onChange={onNewPasswordHandler}
          />
        </div>

        <div className={styles.check_password_box}>
          <input
            className={styles.input_check_password}
            value={passwordcheck}
            type="password"
            placeholder="비밀번호 확인"
            onChange={onPasswordCheckHandler}
          />
          <p>{message}</p>
        </div>

        <button className={styles.check_button} type="submit">
          확인
        </button>

        <button
          className={styles.cancel_button}
          onClick={(e) => {
            history.push("/myPage");
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
