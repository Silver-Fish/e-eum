import React, { useState, useEffect } from 'react';
import HearderComp from '../../components/HeaderComp/HeaderComp';
import styles from './index.module.css';
import Card from '../../components/QrCard/Card';
import CardAdd from '../../components/QrCard/CardAdd';
import CardEdit from '../../components/QrCard/CardEdit';
import SpeechBoxCard from '../../components/QrCard/SpeechBoxCard';
import axios from 'axios';

const QrCard = ({ match }) => {
  const qrId = match.params.qrId;
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  // const [cardUrl, setCardUrl] = useState('')
  // const cardUrl = useState([0])
  const [cardName, setCardName] = useState(false);
  const [cardId, setCardId] = useState(false);
  const [isCardStateEdit, setCardStateEdit] = useState(false);
  const [cardUrl, setCardUrl] = useState('');
  const [qrCardDatas, setQrCard] = useState([]);

  const token = sessionStorage.getItem('jwt');
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    console.log(qrId);
    axios
      .get(process.env.REACT_APP_API_URL + '/card/qr?typeId=' + qrId, config)
      .then((res) => {
        console.log(res);
        setQrCard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addClick = () => {
    setAdd(!isAdd);
  };

  const editClick = () => {
    setEdit(!isEdit);
  };

  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);

  const cardClick = (data) => {
    setSpeechBoxDatas([...speechBoxDatas, [data.cardName['textValue'], data.cardUrl['cardUrl']]]);
  };

  const deleteClick = () => {
    speechBoxDatas.pop();
    setSpeechBoxDatas([...speechBoxDatas]);
  };

  const CardStateEdit = (data) => {
    setCardStateEdit(data['state']);
    setCardName(data['name']);
    setCardUrl(data['url']);
    setCardId(data['cardId']);
  };

  const cardEditStateChange = (data) => {
    setCardStateEdit(!isCardStateEdit);
  };

  const qrCardList = qrCardDatas.map((card, i) => (
    <Card
      key={i}
      id={card.id}
      textValue={card.word}
      cardUrl={card.imageUrl}
      isEdit={isEdit}
      cardClick={cardClick}
      CardStateEdit={CardStateEdit}
    ></Card>
  ));

  const speechBoxList = speechBoxDatas.map((speech, i) => (
    <SpeechBoxCard key={i} textValue={speech[0]} cardUrl={speech[1]}></SpeechBoxCard>
  ));

  return (
    <>
      {(function () {
        if (isAdd === false && isCardStateEdit === false)
          return (
            <>
              <HearderComp headertitle="QR 카드" headerColor="yello"></HearderComp>
              <div className={styles.speech_box}>
                <div className={styles.speech_item_box}>{speechBoxList}</div>

                <button onClick={deleteClick} className={styles.speech_cancel}>
                  <img src="/images/close.svg" alt="" />
                </button>
              </div>

              <div className={styles.qr_card_box}>{qrCardList}</div>

              <div className={styles.button_box}>
                <button className={styles.add_button} onClick={addClick}>
                  추가
                </button>
                <button className={styles.update_button} onClick={editClick}>
                  수정
                </button>
              </div>
            </>
          );
        if (isAdd === true)
          return (
            <>
              <HearderComp headertitle="카드 등록" headerColor="yellow"></HearderComp>
              <CardAdd qrId={qrId} addClick={addClick}></CardAdd>
            </>
          );
        if (isCardStateEdit === true)
          return (
            <>
              <HearderComp headertitle="카드 수정" headerColor="yellow"></HearderComp>
              <CardEdit
                cardEditStateChange={cardEditStateChange}
                cardName={cardName}
                cardUrl={cardUrl}
                cardId={cardId}
              ></CardEdit>
            </>
          );
      })()}
    </>
  );
};

export default QrCard;
