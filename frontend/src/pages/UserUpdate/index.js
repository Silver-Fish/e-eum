import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import styles from './index.module.css';

const UserUpdate = () => {

    const history = useHistory();
 
    const [password,setPassword] = useState("");
    const [newpassword,setNewPassword] = useState("");
    const [passwordcheck,setPasswordCheck] = useState("");
    const [message , setMessage] = useState("");

    const onNewPasswordHandler = (e) =>{
      setNewPassword(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };
    
    const onPasswordCheckHandler = (e) => {
        setPasswordCheck(e.currentTarget.value);
      };  

      useEffect(() => {
        if(newpassword === "" && passwordcheck==="")  setMessage("");
        else if((passwordcheck !== "" && newpassword ==="") || (passwordcheck === "" && newpassword !=="") ) setMessage("비밀번호를 입력해주세요");
        else if(passwordcheck===newpassword) setMessage("비밀번호가 일치합니다.");
        else if(passwordcheck!==newpassword)setMessage("비밀번호가 일치하지 않습니다.");
      });  
 

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(password===passwordcheck && password !==""){
          axios
          .get(process.env.REACT_APP_API_URL +'/accouts/confirm?password=' + password,{
              headers:{
                  Authorization: sessionStorage.getItem('jwt'),
              },
          })
          .then((res) => {
            //현재 비밀번호가 맞다면
            if (res.data) {         
                axios
                .put(process.env.REACT_APP_API_URL+'/accouts/changePassword' ,newpassword)
                .then((suc)=>{
                  if(suc.data){
                    history.push('/myPage');
                  }
                  else{
                    alert('비밀번호 변경 실패');
                  }
                })              
              
            } else {
              alert('현재 비밀번호 체크!');
            }
          })
          .catch((err) => {
            alert('오류');
          });
        }
        else{
            console.log("변경할 비밀번호 체크")
        }

      };

    return (
        <div>
             <ImgboxTitle src = "/images/changePassword.PNG" />
          
      <form onSubmit={onSubmitHandler}>   
        <input 
          value={password}
          type="password" 
          placeholder="현재 비밀번호"
           onChange={onPasswordHandler}
        />
        <br />
        <input
          value={newpassword}
          type="password"
          placeholder="변경할 비밀번호"
          onChange={onNewPasswordHandler}
        />
        <br />
        <input
          value={passwordcheck}
          type="password"
          placeholder="비밀번호 확인"
          onChange={onPasswordCheckHandler}
         
        />
        <br />
        <p>{message}</p>
        <br />
        <button type="submit">확인</button>
        <button 
        className={styles.Button_cancel}
        onClick={(e)=>{
          history.push('/myPage')
        }}>취소</button>
      </form>             
      </div>
    );
};

export default UserUpdate;