import React from 'react'
import styles from './MainFooterButtonComp.module.css'
import { useHistory } from "react-router-dom";


const MainFooterButton = (props) => {
  const history = useHistory();
  const buttonImg = props.buttonImg
  const textValue = props.textValue
  
  const handleClick = (e) => {    
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