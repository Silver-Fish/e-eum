import React from 'react'
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import styles from './index.module.css'

const Setting = () => {
    return(
        <div className={styles.setting_box}>
            <HeaderComp headertitle='설정'></HeaderComp>
            <div className={styles.setting_text}>
                <h2>
                    <span  className={styles.red}>음성속도 </span> 
                        조절 및 
                    <span  className={styles.red}> 음성합성 </span> 
                        서비스 준비중 입니다.
                </h2>

                
                <h2  className={styles.red}>Comming Soon</h2>
                <h3 className={styles.red}>음성속도</h3>
                  ~2021-05-05
                <h3 className={styles.red}>음성합성</h3>
                ~2021-05-17

            </div>
        </div>
    )
}

export default Setting