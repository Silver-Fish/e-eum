import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import HeaderComp from "../../components/HeaderComp/HeaderComp";
import styles from "./index.module.css";
import UserRegisterLoader from "../../components/Loader/UserRegisterLoader";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");
  const [check, isCheck] = useState(false);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordCheckHandler = (e) => {
    setPasswordCheck(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      password === passwordcheck &&
      password !== "" &&
      check &&
      name !== "" &&
      email !== ""
    ) {
      const userData = {
        email: email,
        password: password,
        name: name,
      };
      setLoading(!isLoading);

      axios
        .post(process.env.REACT_APP_API_URL + "/accounts", userData)
        .then((res) => {
          setLoading(!isLoading);
          if (res.data === "Created") {
            history.push("./userRegisterSuccess");
          } else {
            alert("회원가입실패");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (password !== passwordcheck) {
      alert("비밀번호를 확인해주세요.");
    } else if (!check) {
      alert("이메일 중복을 확인해주세요.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요");
    } else if (email === "") {
      alert("이메일을 입력해주세요");
    } else if (name === "") {
      alert("이름을 입력해주세요");
    }
  };

  useEffect(() => {
    if (password === "" && passwordcheck === "") setMessage("");
    else if (
      (passwordcheck !== "" && password === "") ||
      (passwordcheck === "" && password !== "")
    )
      setMessage("비밀번호를 입력해주세요");
    else if (passwordcheck === password) setMessage("비밀번호가 일치합니다.");
    else if (passwordcheck !== password)
      setMessage("비밀번호가 일치하지 않습니다.");
  }, [password, passwordcheck]);

  const onEmailCheck = (e) => {
    e.preventDefault();

    console.log("중복체크");
    if (email !== "") {
      axios
        .get(
          process.env.REACT_APP_API_URL + "/accounts/check-dup?email=" + email
        )
        .then((res) => {
          if (res.data) {
            isCheck(false);
            alert("중복된 이메일입니다.");
          } else {
            isCheck(true);
            alert("사용 가능한 이메일입니다.");
          }
        })
        .catch((err) => {
          alert("중복에러");
          console.log(err.response);
        });
    }
  };

  const onCancelButton = (e) => {
    e.preventDefault();
    console.log("취소");
    history.push("./login");
  };

  return (
    <div className={styles.register_box}>
      <HeaderComp headertitle="회원가입" />
      {isLoading === false ? (
        <>
          <form className={styles.MainForm} onSubmit={onSubmitHandler}>
            <div className={styles.email_box}>
              <input
                className={styles.inputEmail}
                value={email}
                type="email"
                placeholder="이메일"
                onChange={onEmailHandler}
              />

              <div className={styles.checkEmail}>
                <button onClick={onEmailCheck}>
                  <span>중복</span>
                  <br />
                  <span>확인</span>
                </button>
              </div>
            </div>

            <div className={styles.name_box}>
              <input
                className={styles.input_name}
                value={name}
                type="text"
                placeholder="이름"
                onChange={onNameHandler}
              />
            </div>

            <div className={styles.password_box}>
              <input
                className={styles.input_password}
                value={password}
                type="password"
                placeholder="비밀번호"
                onChange={onPasswordHandler}
              />
            </div>

            <div className={styles.password_check_box}>
              <input
                className={styles.input_password_check}
                value={passwordcheck}
                type="password"
                placeholder="비밀번호 확인"
                onChange={onPasswordCheckHandler}
              />
              <p>{message}</p>
            </div>

            <button className={styles.register_button} type="submit">
              회원가입
            </button>

            <button className={styles.cancel_button} onClick={onCancelButton}>
              취소
            </button>
          </form>
        </>
      ) : (
        <UserRegisterLoader></UserRegisterLoader>
      )}
    </div>
  );
};

export default UserRegister;
