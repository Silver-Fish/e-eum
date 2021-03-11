import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import CategoryCard from '../../components/CategoryCard/CategoryCard'


const Category = () => {
  const [categoryDatas, setCategory] = useState([
    '학교', '병원' , '싸피' , '감정표현', '스타벅스', 
    '학교', '병원' , '싸피' , '감정표현', '스타벅스',
    '학교', '병원' , '싸피' , '감정표현', '스타벅스'
  ]);

  const categoryList = categoryDatas.map(
    (category, i) => (
      <CategoryCard key={i} textValue={category}></CategoryCard>
    )
  )

  return (
    <>
      <HeaderComp heardertitle='상황별 이음'></HeaderComp>
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