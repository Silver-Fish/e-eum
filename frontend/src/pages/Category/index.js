import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import SpeechBoxCard from '../../components/CategoryCard/SpeechBoxCard'

const Category = () => {
  const [categoryDatas, setCategory] = useState([
    '학교', '병원' , '싸피' , '감정표현', '스타벅스', 
    '학교', '병원' , '싸피' , '감정표현', '스타벅스',
    '학교', '병원' , '싸피' , '감정표현', '스타벅스',
    '학교', '병원' , '싸피' , '감정표현', 
  ]);

  const categoryList = categoryDatas.map(
    (category, i) => (
      <CategoryCard key={i} textValue={category}></CategoryCard>
    )
  )

  const [speechBoxDatas, setSpeechBox] = useState([
    '예시', '예시' , '예시', '예시', '예시' , '예시'
  ]);

  const speechBoxList = speechBoxDatas.map(
    (speech, i) => (
      <SpeechBoxCard key={i} textValue={speech}></SpeechBoxCard>
    )
  )


  

  return (
    <>
      <HeaderComp heardertitle='상황별 이음'></HeaderComp>
      <div className={styles.speech_box}>
        <div className={styles.speech_card}>
          { speechBoxList }
        </div>

        <button className={styles.del_button}>
          <img className={styles.del_img} src="/images/close.svg" alt="이미지"/>
        </button>

      </div>
      <div className={styles.category_card_box}>
        { categoryList }
      </div>
      <div className={styles.button_box}>
        <button className={styles.add_button}>추가</button>
        <button className={styles.update_button}>수정</button>
      </div>
    </>
  );
}

export default Category;