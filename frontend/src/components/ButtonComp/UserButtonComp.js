import React from 'react';
import { useHistory } from "react-router-dom";
import styles from './EeumButtonComp.module.css';
const UserButtonComp = (props) => {

  const history = useHistory();
  const buttonTextValue = props.textValue;
  const handleClick = (e) => {    
    history.push(props.handleClickPath) 
  }
    return (
    <button 
      className={styles.button}
      onClick = {handleClick}
    >  
        { buttonTextValue } 
      </button>
    );
};

export default UserButtonComp;