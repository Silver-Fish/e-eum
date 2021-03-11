import React,{useState} from 'react';
import { useHistory } from "react-router-dom";


const Confirm = () => {

    const history = useHistory();
    const [password,setPassword] = useState("");

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };

    const onPressEnter = (e) =>{
        //비밀번호가 일치하다면
        if(e.key === 'Enter'){
            history.push('./userDelete') 
        }
    }

    const buttonClick = () =>{
        //비밀번호가 일치하면 회원삭제페이지 ㄱ
        history.push('./userDelete') 
    }

    return (
        <div>
            <img src = "/images/confirmImage.PNG"  alt = "사진입니다."/><br/>
            비밀번호
            <input type ="password" placeholder="비밀번호 확인" value ={password} onChange={onPasswordHandler} onKeyUp={onPressEnter}/><br/>
            <button onClick={buttonClick}>확인</button>            
        </div>
    );
};

export default Confirm;