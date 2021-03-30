import React, { useState } from 'react'
import HearderComp from '../../components/HeaderComp/HeaderComp'
import styles from './index.module.css'
import Card from '../../components/QrCard/Card';

const QrCard = () => {
  // const [isAdd, setAdd] = useState(false);
  // const [isEdit, setEdit] = useState(false);
  // const [cardUrl, setCardUrl] = useState('')
  // const cardUrl = useState([0])

  // const [qrCardDatas, setQrCard] = useState([]);
  const qrCardDatas = useState([
    ['데이터', ''], ['데이터', ''], ['데이터', ''],
  ]);

  const qrCardList = qrCardDatas.map(
    (card,i) => (
      <Card
        key={i} 
        textValue={card.word}
        imgUrl={card.imageUrl}
        // isEdit={isEdit}
        // cardClick={cardClick}
      >
      </Card>
    )
  )




  // const [speechBoxDatas, setSpeechBoxDatas] = useState([]);

  // const cardClick = (data) => {
    
  //   setSpeechBoxDatas([...speechBoxDatas,
  //     [data.cardName['textValue'], data.imgUrl['imgUrl']]
  //   ]);
  // }

  // const deleteClick = () => {
  //   speechBoxDatas.pop()
  //   console.log(speechBoxDatas)
  //   setSpeechBoxDatas([...speechBoxDatas])  
  // }
  
  
  
  
  return(
    <>
    <HearderComp headertitle='QR 카드' headerColor='yello'></HearderComp>
    <div className={styles.speech_box}>
      <div className={styles.speech_item_box}>
        {/* { speechBoxList } */}
      </div> 
    </div>

    <div className={styles.qr_card_box}>
      { qrCardList }
    </div>

    <div className={styles.button_box}>
      <button className={styles.add_button} onClick={123}>추가</button>
      <button className={styles.update_button} onClick={123}>수정</button>
    </div>
    </>
  )
}

export default QrCard;