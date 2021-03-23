import React,{useState} from 'react';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import { useHistory } from 'react-router-dom';

import styles from './index.module.css';


const Confirm = () => {

    const history = useHistory();
    const [password,setPassword] = useState("");
    

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // axios
        //   .get('http://localhost:8080/api/accouts/find?email=' + email + '&name=' + name)
        //   .then((res) => {
        //     if (res.data) {
        //       setModal(true);
        //     } else {
        //       alert('이메일 또는 이름 오류');
        //     }
        //   })
        //   .catch((err) => {
        //     alert('오류발생');
        //   });
      }; 


 

    return (
        <div>
            <ImgboxTitle src='/images/confirmImage.PNG'/>            
            비밀번호 
            <form onSubmit={onSubmitHandler}>
             <input type ="password" placeholder="비밀번호 확인" value ={password} onChange={onPasswordHandler} /><br/>
             <button type ="submit">확인</button>         
            </form>
            <button
            className={styles.Button_Cancel}
            onClick={(e) => {
              history.push('/login');
            }}
          >
            취소
          </button>
        </div>
    );
};

export default Confirm;