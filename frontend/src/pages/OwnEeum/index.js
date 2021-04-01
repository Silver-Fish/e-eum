import React, {useState,useEffect} from 'react';
import styles from './index.module.css'
import OwnCardComp from '../../components/OwnCardComp/OwnCardComp';
import SpeechBoxCard from '../../components/OwnCardComp/SpeechBoxCard';
import OwnCardadd from '../../components/OwnCardComp/OwnCardadd';
import OwnCardEdit from '../../components/OwnCardComp/OwnCardEdit';
// import Card from '../../components/OwnCardComp/Card';
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OwnEeum = () => {
  const history = useHistory();
  const checkLogin = sessionStorage.getItem('jwt')
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [goEdit, setgoEdit] = useState(false);
  const [owncardDatas, setOwncardDatas] = useState([0])
  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);
  const [imgUrl, setimgUrl] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardId, setCardId] = useState('') 

  const cardClick = (data) => {
    
    setSpeechBoxDatas([...speechBoxDatas,
      [data.cardName['textValue'], data.imgUrl['imgUrl']]
    ]);
    console.log(data)
    console.log(speechBoxDatas)
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
  const editCard = () => {
    console.log('edit')
    setEdit(!isEdit)
  }
  const OwnGoEdit = (data) => {
    setgoEdit(data.state)
    setimgUrl(data.url)
    setCardName(data.name)
    setCardId(data.id)
  }
  const goEditStateChange = () => {
    setgoEdit(!goEdit)
  }
  const owncardList = owncardDatas.map(
    (owncard,i) => (
      <OwnCardComp 
        key={i} 
        cardId={owncard.id}
        textValue={owncard.word}
        imgUrl={owncard.imageUrl}
        cardClick={cardClick}
        isEdit={isEdit}
        goEdit={goEdit}
        OwnGoEdit = {OwnGoEdit}
        // categoryCardEdit = {categoryCardEdit}
      >
      </OwnCardComp>
    )
  )
  const speechBoxList = speechBoxDatas.map(
    (speech, i) => (
      <SpeechBoxCard
      key={i} 
      c={speech[0]} 
      imgUrl={speech[1]}
      ></SpeechBoxCard>
      )
  )
  
  const addCard = () => {
    setAdd(!isAdd)
  }

  const noLogin = () => {
    alert('로그인 해주세요')
    history.push('./login');
  }
  
  return (
    <>
      {
        (() => {
          if (isAdd !== true && goEdit !== true) 
            return (
            <div className={styles.owncard_box}>
            <HeaderComp headertitle='나만의 이음'></HeaderComp>
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
            <div className={styles.bottom_button}>
              <div className={styles.button_box}>
                { checkLogin !== null
                  ?
                <>
                  <button className={styles.add_button} onClick={addCard}>추가</button>
                  <button className={styles.update_button} onClick={editCard}>수정</button>
                  
                </>
                :
                <>

                  <button className={styles.add_button} onClick={noLogin}>추가</button>
                  <button className={styles.update_button} onClick={noLogin}>수정</button>
                </>
                }
              </div>
            </div>
            </div>
            )
          else if (isAdd ===true)
            return(
            <div>
              <HeaderComp headertitle='카드 추가'></HeaderComp>
              <OwnCardadd addStateChange={addCard}></OwnCardadd>
            </div>  
          )
          // else if (isEdit ===true)
          //   return(
          //   <div>
          //     <HeaderComp headertitle='나만의 이음'></HeaderComp>
          //     <div className={styles.speech_box}>
          //       <div className={styles.speech_item_box}>
          //         { speechBoxList }
          //       </div>
          //       <button className={styles.speech_cancel}>
          //         <img src="/images/close.svg" alt=""/>
          //       </button> 
          //     </div>
          //     <div className={styles.owneeum_card_box}>
          //       {owncardList}
          //     </div>
          //     <div className={styles.button_box}>
          //       <button className={styles.add_button} onClick={addCard}>추가</button>
          //       <button className={styles.update_button} onClick={editCard}>수정</button>
          //     </div>
          //   </div>
          //   )
          else if(goEdit ===true)
            return(
              <>
              <HeaderComp headertitle='카드 수정'></HeaderComp>
              <OwnCardEdit
                goEditStateChange={goEditStateChange}
                cardName={cardName}
                imgUrl={imgUrl}
                cardId={cardId}
              ></OwnCardEdit>
              </>
            )

        })()
      }
    </>
  ); 
};

export default OwnEeum;