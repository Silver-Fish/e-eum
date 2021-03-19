import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './HeaderModal.module.css';


const HeaderModal = (props) => {
  console.log(props)
  const [isModal, setModal] = useState(props.isModal);  
  
  const history = useHistory();
  
  const mypageClick = (e) => {
    history.push('./mypage')
  }

  const settingClick = (e) => {
    history.push('./setting')
  }
  return(
    <>
      { isModal === true 
        ?
        <div className={styles.modal_box}>
          
          <div className={styles.modal_header_box}>
            <button  className={styles.header_button} >
              <img className={styles.header_button_image} src="/images/hamburger.svg" alt="이미지"/>
            </button>      
            <button  className={styles.header_button}
              onClick={
                function(e) {
                  setModal(!isModal)
                  props.onClick({isModal});
              }}>
              <img className={styles.header_button_image} src="/images/close.svg" alt="이미지"/>
            </button>      
          </div>
          
          {/* 검색 아직 구현 안함 */}
          <div className={ styles.modal_main_box }>
            <input className={styles.modal_search} type="text" placeholder="검색"/>
            <ul className={styles.modal_list}>
              <li className={styles.modal_list_line} ><button className={styles.modal_button} onClick={mypageClick}>마이 페이지</button></li>
              <li className={styles.modal_list_line} ><button className={styles.modal_button} onClick={settingClick} >설정</button></li>
            </ul>
          </div>
        </div>
        : isModal
      }
    </>
  )
}

export default HeaderModal