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

                <h1>
                    <p  className={styles.red}>Comming Soon</p>
                    2021-05-05</h1>
            </div>
        </div>
    )
}

export default Setting