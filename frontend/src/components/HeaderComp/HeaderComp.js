import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './HeaderComp.module.css';

const HeaderComp = (props) => {
  const [isModal, setModal] = useState(false);
  const history = useHistory();
  const headertitle = props.headertitle;
  const headerColor = props.headerColor
  const homeClick = (e) => {
    history.push('/');
  };
  const mypageClick = (e) => {
    if (sessionStorage.getItem('jwt') !== null) history.push('/myPage');
    else setModal(false);
  };
  const myEeumClick = (e) => {
    history.push('/setting');
  };
  const situationEeumClick = (e) => {
    history.push('/category');
  };
  const qrEeumClick = (e) => {
    if (sessionStorage.getItem('jwt') !== null) history.push('/setting');
    else setModal(false);
  };
  const settingClick = (e) => {
    history.push('/setting');
  };

  return (
    <>
      {isModal !== true ? (
        // <div className={'styles.header_box' + " " + headerColor === undefined ? '' : styles.headerColor}>
        <div className={styles.header_box + " " + (headerColor === undefined ? '' : styles.yellow)}>
          <img
            className={styles.header_image}
            src="/favicon.png"
            alt="이미지"
            onClick={homeClick}
          />
          <span className={styles.header_title}>{headertitle}</span>
          <button
            className={styles.header_button}
            onClick={function (e) {
              setModal(!isModal);
            }}
          >
            <img className={styles.header_button_image} src="/images/hamburger.svg" alt="이미지" />
          </button>
        </div>
      ) : (
        <div className={styles.modal_box}>
          <div className={styles.modal_header_box}>
            <button className={styles.modal_header_button}>
              <img
                className={styles.modal_header_button_image}
                src="/images/hamburger.svg"
                alt="이미지"
              />
            </button>
            <button
              className={styles.modal_header_button}
              onClick={function (e) {
                setModal(!isModal);
              }}
            >
              <img
                className={styles.modal_header_button_image}
                src="/images/close.svg"
                alt="이미지"
              />
            </button>
          </div>

          {/* 검색 아직 구현 안함 */}
          <div className={styles.modal_main_box}>
            <input className={styles.modal_search} type="text" placeholder="검색" />
            <ul className={styles.modal_list}>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={mypageClick}>
                  마이 페이지
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={myEeumClick}>
                  나만의 이음
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={situationEeumClick}>
                  상황별 이음
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={qrEeumClick}>
                  QR로 이음
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={settingClick}>
                  설정
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderComp;
// export default connect()(HeaderComp);
