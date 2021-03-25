import React, {useState,useEffect} from 'react';
import styles from './index.module.css'
import OwnCardComp from '../../components/OwnCardComp/OwnCardComp';
import SpeechBoxCard from '../../components/OwnCardComp/SpeechBoxCard';
import OwnCardadd from '../../components/OwnCardComp/OwnCardadd';
// import Card from '../../components/OwnCardComp/Card';
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import axios from 'axios';


const OwnEeum = () => {
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  // const [cardUrl, setCardUrl] = useState('')
  const cardUrl = useState([0])
  // const [cardName, setCardName] = useState('')
  // const [owncardDatas, setOwncardDatas] = useState([
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  //   ['안녕하세요', '/images/user.png'], ['화장실', '/images/user.png'] , ['물', '/images/user.png'] , ['감사합니다', '/images/user.png'], ['안녕히가세요', '/images/user.png'], 
  // ])
  const [owncardDatas, setOwncardDatas] = useState([0])
  // const owncardDatas = useState([0])

  // const [cardDatas, setCard] = useState([]);
  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);

  const cardClick = (data) => {
    
    setSpeechBoxDatas([...speechBoxDatas,
      [data.cardName['textValue'], data.imgUrl['imgUrl']]
    ]);
    console.log(speechBoxDatas)
    console.log(speechBoxList)
  }
  const deleteClick = () => {
    speechBoxDatas.pop()
    console.log(speechBoxDatas)
    setSpeechBoxDatas([...speechBoxDatas])
    
  }
  const token = sessionStorage.getItem('jwt')
  const config = {
    headers: {
      'Authorization': token
    }
  }
  useEffect(() => {
    console.log("useeffect")
    const type = 'own'
    // const params = {type: type}
    axios.get(process.env.REACT_APP_API_URL+`/card/${type}`,
    config)
    .then((res)=> {
      console.log(res)
      console.log(res.data)
      console.log(res.data[0].imageUrl)
      setOwncardDatas(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const owncardList = owncardDatas.map(
    (owncard,i) => (
      <OwnCardComp 
        key={i} 
        textValue={owncard.word}
        imgUrl={owncard.imageUrl}
        isEdit={isEdit}
        cardClick={cardClick}
        // categoryCardEdit = {categoryCardEdit}
      >
      </OwnCardComp>
    )
  )
  const speechBoxList = speechBoxDatas.map(
    (speech, i) => (
      <SpeechBoxCard
        key={i} 
        textValue={speech[0]} 
        imgUrl={speech[1]}
      ></SpeechBoxCard>
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
            <div className={styles.speech_box}>
               <div className={styles.speech_item_box}>
               { speechBoxList }
              </div>

              <button onClick={deleteClick} className={styles.speech_cancel}>
                <img src="/images/close.svg" alt=""/>
              </button> 
            </div>

            <div className={styles.owneeum_card_box}>
            {owncardList}
            </div>
            <div className={styles.button_box}>
            <button className={styles.add_button} onClick={addCard}>추가</button>
            <button className={styles.update_button} onClick={editCard}>수정</button>
            </div>
            </div>
            )
          else if (isAdd ===true)
            return(
            <div>
            <HeaderComp heardertitle='카드 추가'></HeaderComp>
            <OwnCardadd addStateChange={addCard}></OwnCardadd>
            </div>  
          )
          else if (isEdit ===true)
            return(
            <div>
              <HeaderComp heardertitle='나만의 이음'></HeaderComp>
              <div className={styles.speech_box}>
                <div className={styles.speech_item_box}>
                  { speechBoxList }
                </div>

              <button className={styles.speech_cancel}>
                <img src="/images/close.svg" alt=""/>
              </button> 
            </div>
              <div className={styles.owneeum_card_box}>
                {owncardList}
              </div>
            <div className={styles.button_box}>
              <button className={styles.add_button} onClick={addCard}>추가</button>
              <button className={styles.update_button} onClick={editCard}>수정</button>
            </div>

            </div>


            )

        })()
      }
    </>
  ); 
};

export default OwnEeum;