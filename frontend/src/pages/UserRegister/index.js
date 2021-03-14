import React , {useState} from 'react';
import Imgbox from '../../components/Image/Imgbox';
const UserRegister = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordcheck, setPasswordCheck] = useState("");
    const [message , setMessage] = useState("");
    
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
      };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };

    const onPasswordCheckHandler = (e) => {
        setPasswordCheck(e.currentTarget.value);
    
      };

      const onNameHandler = (e) => {
        setName(e.currentTarget.value);
      };
    
      const onSubmitHandler = (e) => {
        e.preventDefault();
        if(password===passwordcheck){
            console.log('Email', email);
            console.log('Name' , name);
            console.log('Password', password);
        }
        else{
            console.log("가입실패2")
        }

      };

      const onMessageController = () =>{
        if(password === "")  setMessage("");
        else if(passwordcheck !== "" && password ==="") setMessage("비밀번호를 입력해주세요");
        (password === passwordcheck) ? setMessage("비밀번호가 일치합니다.") : setMessage("비밀번호가 일치하지 않습니다.");
       
      };

    return (
        <div>
            <Imgbox src = "/images/RegisterImage.PNG"/><br/>
            <br/>
            <form onSubmit={onSubmitHandler}>
                <input value ={ email } type ="text"  placeholder="이메일" onChange={onEmailHandler}/><br/>
                <input value ={ name } type ="text"  placeholder="이름" onChange={onNameHandler}/><br/>
                <input value ={ password } type ="password"  placeholder="비밀번호" onChange={onPasswordHandler}/><br/>                
                <input value ={ passwordcheck } type ="password"  placeholder="비밀번호 확인" onChange={onPasswordCheckHandler} onKeyUp={onMessageController}/><br/>
                <p style ={ {color : "red"} }>{ message }</p><br/>
                <button type ="submit">회원가입</button>
            </form>
        </div>
    );
};

export default UserRegister;