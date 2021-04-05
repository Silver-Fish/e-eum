import React from "react";
import styles from "./UserRegisterLoader.module.css";

const Loader = () => {
  return (
    <div onLoad="showImage()" className={styles.loading_box}>
      <div className={styles.loading_img}></div>
      <div className={styles.loading_img2}></div>

      <div className={styles.loading}>
        <span>회</span>
        <span>원</span>
        <span>가</span>
        <span>입</span>
        <span></span>
        <span>중</span>
        <span>입</span>
        <span>니</span>
        <span>다</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default Loader;
