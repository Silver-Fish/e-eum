import React from 'react';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import styles from './index.module.css'

const Help = () => {
    return(
        <div className={styles.help_box}>
          <HeaderComp headertitle='도움말'></HeaderComp>
          <div className={styles.feature_box}>
            <h3>1. 나만의 이음</h3>
            <p>사용자 편의에 따라 의사표현 카드를 구성</p>
            <p>(카드 추가,수정 삭제 시 로그인 必)</p>
            <br/>
            <h3>2. 상황별 이음</h3>
            <p>상황 별로 의사표현카드를 분류하여 제공</p>
            <p>(카드 추가,수정 삭제 시 로그인 必)</p>
            <br/>
            <h3>3. QR로 이음</h3>
            <p>가게, 관공서, 학교 등 해당 장소에서 사용되는 의사표현 카드를 구성하여 제공</p>
            <h4 className={styles.blue}>*QR 서비스 제공자*</h4>
            <p className={styles.indent_text}>해당 장소에서 필요한 카드를 구성 후 QR 코드를 게시할 수 있는 기능</p>
            <h4 className={styles.red}>*QR 서비스 사용자*</h4>
            <p className={styles.indent_text}>QR 코드를 통해 바로 의사표현 카드 목록을 사용</p>
          </div>
        </div>
    )
}

export default Help