import React, { useState } from 'react';
import styles from './CardEdit.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader'

const CardEdit = (props) => {
  const history = useHistory();
  const [cardImg, setCardImg] = useState(props['cardUrl']);
  const [cardName, setCardName] = useState(props['cardName']);
  const cardId = props['cardId'];
  let [lenCardName, setlenCardName] = useState(props['cardName'].length)
  const [isLoading, setLoading] = useState(false)

  const onImageChange = function (e) {
    setCardImg(e.target.value);
    setCardImg(URL.createObjectURL(e.target.files[0]));
  };

  const onInputChange = (e) => {
    if (e.target.value.length > 10){
      alert('카드이름은 10자까지 가능합니다.')
    } else{
      setCardName(e.target.value)
      setlenCardName(e.target.value.length)
    }
  };

  const editCard = () => {
    setLoading(!isLoading)
    const token = sessionStorage.getItem('jwt');
    const data = {
      word: cardName,
    };

    axios
      .put(process.env.REACT_APP_API_URL + '/card/' + cardId, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setLoading(!isLoading)
        history.go(0);
      })
      .catch((err) => {
        alert('카드수정 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
        setLoading(!isLoading)
        history.go(0);
      });
  };

  const speakClick = () => {
    console.log('소리쳐');
  };

  return (
    <>
      { isLoading === false
      ?
      (
      <>
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img src={cardImg} alt="이미지를 등록해주세요" />

          <label className={styles.image_button}>
            <img src="/images/photo-camera.svg" alt="대체이미지" />
            <input type="file" className={styles.image_input} onChange={onImageChange} />
          </label>
        </div>

        <div className={styles.card_input_box}>
          <input
            type="text"
            className={styles.card_input}
            defaultValue={cardName}
            onChange={onInputChange}
            placeholder="카드 이름"
            maxLength='10'
          />
          <img onClick={speakClick} src="/images/speaker-filled-audio-tool.svg" alt="대체이미지" />
        </div>
        <p>{lenCardName}/10</p>
      </div>

      <div className={styles.button_box}>
        <button className={styles.close_button} onClick={props.cardEditStateChange}>
          취소
        </button>
        <button className={styles.add_button} onClick={editCard}>
          등록
        </button>
      </div>
      </>
      )
      :
      (
        <Loader></Loader>
      )
      }
    </>
  );
};

export default CardEdit;
