import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const UserUpdate = () => {

    const history = useHistory();
    const [name, setName] = useState("");
    const email = "";
    const [password,setPassword] = useState("");
    const [passwordcheck,setPasswordCheck] = useState("");
    const [message , setMessage] = useState("");

    const onNameHandler = (e) =>{
        setName(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };
    
    const onPasswordCheckHandler = (e) => {
        setPasswordCheck(e.currentTarget.value);
      };  

    const onMessageController = () =>{
        if(password === "")  setMessage("");
        else if(passwordcheck !== "" && password ==="") setMessage("비밀번호를 입력해주세요");
        (password === passwordcheck) ? setMessage("비밀번호가 일치합니다.") : setMessage("비밀번호가 일치하지 않습니다.");
       
      };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(password===passwordcheck){
            console.log('Email', email);
            console.log('Name' , name);
            console.log('Password', password);
            history.push('./myPage') 
        }
        else{
            console.log("가입실패2")
        }

      };

    return (
        <div>
             <img src = "/images/updateImage.PNG"  alt = "사진입니다."/>
             <form onSubmit={onSubmitHandler}>
                 이름<input value = { name } type = "text" placeholder={name} onChange={onNameHandler} /> <br/>
                 이메일<input readOnly value ={ email } type ="text"  placeholder={email} /><br/>
                비밀번호<input value ={ password } type ="password"  placeholder={password} onChange={onPasswordHandler}/><br/>                
                비밀번호 확인<input value ={ passwordcheck } type ="password"  placeholder="비밀번호 확인" onChange={onPasswordCheckHandler} onKeyUp={onMessageController}/><br/>
                <p style ={ {color : "red"} }>{ message }</p><br/>
                <button type ="submit">수정하기</button>
             </form>
        </div>
    );
};

export default UserUpdate;