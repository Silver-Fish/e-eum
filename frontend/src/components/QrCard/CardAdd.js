import React, { useState } from 'react';
import styles from './CardAdd.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CardAdd = (props) => {
  const qrId = props.qrId;
  const history = useHistory();
  const [imgFile, setImgFile] = useState();
  const [cardImg, setImg] = useState();
  const [cardName, setCardName] = useState();
  let [lenCardName, setlenCardName] = useState(0)
  const onImageChange = function (e) {
    setImgFile(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const onInputChange = (e) => {
    
    if (e.target.value.length > 10){
      alert('카드이름은 10자까지 가능합니다.')
    } else{
      setCardName(e.target.value)
      setlenCardName(e.target.value.length)
    }

  };

  const categoryId = props.categoryId;

  const speakClick = () => {
    console.log('소리쳐');
  };
  const cardRegisterClick = () => {
    const token = sessionStorage.getItem('jwt');

    let data = new FormData();
    data.append('file', imgFile);
    data.append('word', cardName);
    data.append('type', 'qr');
    data.append('typeId', qrId);
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: token,
      },
    };
    axios
      .post(process.env.REACT_APP_API_URL + '/card', data, config)
      .then((res) => {
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
            onChange={onInputChange}
            defalutvalue={cardName}
            placeholder="카드 이름"
            maxLength='10'
          />
          <img onClick={speakClick} src="/images/speaker-filled-audio-tool.svg" alt="대체이미지" />
        </div>
        <p>{lenCardName}/10</p>
      </div>

      <div className={styles.button_box}>
        <button className={styles.close_button} onClick={props.addClick}>
          취소
        </button>
        <button className={styles.add_button} onClick={cardRegisterClick}>
          등록
        </button>
      </div>
    </>
  );
};

export default CardAdd;
