import React, {useState} from 'react';
import styles from './index.module.css'
import OwnCardComp from '../../components/OwnCardComp/OwnCardComp';
import SpeachboxComp from '../../components/SpeachboxComp/SpeachboxComp';
import HeaderComp from '../../components/HeaderComp/HeaderComp'

const OwnEeum = () => {
  const [owncardDatas] = useState([
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
  ])
  const owncardList = owncardDatas.map(
    (owncard,i) => (
      <OwnCardComp key={i} textValue={owncard}></OwnCardComp>
    )
  )
  return (
    <>
    <HeaderComp heardertitle='나만의 이음'></HeaderComp>
    <SpeachboxComp></SpeachboxComp>
    <div className={styles.owneeum_card_box}>
      {owncardList}
    </div>
    </>
  ); 
};

export default OwnEeum;