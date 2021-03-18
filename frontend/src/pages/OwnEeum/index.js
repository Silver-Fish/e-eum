import React, {useState} from 'react';
import styles from './index.module.css'
import OwnCardComp from '../../components/OwnCardComp/OwnCardComp';
import SpeachboxComp from '../../components/OwnCardComp/SpeachboxComp';
import OwnCardadd from '../../components/OwnCardComp/OwnCardadd';
import HeaderComp from '../../components/HeaderComp/HeaderComp'

const OwnEeum = () => {
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [owncardDatas] = useState([
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
    '안녕하세요', '화장실', '물', '감사합니다',
  ])
  const [speechBoxDatas, setSpeechBox] = useState([
    '예시', '예시' , '예시', '예시', '예시' , '예시'
  ]);
  const owncardList = owncardDatas.map(
    (owncard,i) => (
      <OwnCardComp key={i} textValue={owncard}></OwnCardComp>
    )
  )
  const speechBoxList = speechBoxDatas.map(
    (speech, i) => (
      
      <SpeachboxComp key={i} textValue={speech}></SpeachboxComp>
    )
  )
  const addCard = () => {
    setAdd(!isAdd)
  }
  const editCard = () => {
    console.log('edit')
    setEdit(!isEdit)
    
  }
  return (
    <>
      {
        (() => {
          if (isAdd !== true && isEdit !== true) 
            return (
            <div>
            <HeaderComp heardertitle='나만의 이음'></HeaderComp>
            <SpeachboxComp></SpeachboxComp>
            <div className={styles.owneeum_card_box}>
            {owncardList}
            </div>
            <div className={styles.button_box}>
            <button className={styles.add_button} onClick={addCard}>추가</button>
            <button className={styles.update_button} onClick={editCard}>수정</button>
            </div>
            </div>
            )
          else if (isAdd !==false)
            return(
            <div>
            <HeaderComp heardertitle='카드 추가'></HeaderComp>
            <OwnCardadd addStateChange={addCard}></OwnCardadd>
            </div>  
          )
          else if (isEdit !==false)
            return(
            <div>
              <HeaderComp heardertitle='나만의 이음'></HeaderComp>
              <SpeachboxComp></SpeachboxComp>
              <div className={styles.owneeum_card_box}>
              {owncardList}
              </div>
              {/* 이러면안되는데 */}
              <div className={styles.button_box}>
              <button className={styles.add_button} onClick={addCard}>추가</button>
              <button className={styles.update_button} onClick={editCard}>수정2</button>
              </div>
            </div>
            )

        })()
      }
    </>
  ); 
};

export default OwnEeum;