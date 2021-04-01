import React from 'react'
import styles from './MainFooterButtonComp.module.css'
import { useHistory } from "react-router-dom";


const MainFooterButton = (props) => {
  const history = useHistory();
  const buttonImg = props.buttonImg
  const textValue = props.textValue
  
  const handleClick = (e) => {    
    console.log(props.handleClickPath)
    if (props.handleClickPath == '/login'){
      alert('로그인 해주세요')
    }
    history.push(props.handleClickPath) 
  }


  return(  
    <button className={styles.button} onClick={handleClick}>
      <img className={styles.buttonimage} src={buttonImg} alt=""/>
      {textValue}
    </button>
  )
}


export default MainFooterButton