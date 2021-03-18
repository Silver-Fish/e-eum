import React from 'react';
import styles from './LabelComp.module.css';
import { useHistory } from "react-router-dom";


const LabelComp = (props) => {
  const history = useHistory();
  const labelTextValue = props.textValue;

  
  const handleClick = (e) => {    
    history.push(props.handleClickPath) 
  }
  return(
    <label  className={styles.button} onClick = {handleClick}>    
      { labelTextValue } 
    </label>
  )
}

export default LabelComp