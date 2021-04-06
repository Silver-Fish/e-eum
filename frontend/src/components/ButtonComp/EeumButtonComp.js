import React from 'react';
import styles from './EeumButtonComp.module.css';
import { useHistory } from "react-router-dom";


const EeumButtonComp = (props) => {
  const history = useHistory();
  const buttonTextValue = props.textValue;
  const buttonImg = props.buttonImg;
  
  const handleClick = (e) => {    
    console.log(props.handleClickPath)
    if (props.handleClickPath === '/login'){
      alert('로그인 해주세요')
    }
    history.push(props.handleClickPath) 
  }
  return(
    <button 
      className={styles.button}
      onClick = {handleClick}
    >
      { buttonImg !== undefined ?
        <img className={styles.image} src= {buttonImg} alt="이미지"/>
        : "" }
      <span>{ buttonTextValue } </span>
    </button>
  )
}

export default EeumButtonComp