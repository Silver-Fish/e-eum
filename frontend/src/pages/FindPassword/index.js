import React ,{useState} from 'react';
import Imgbox from '../../components/Image/Imgbox';

import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const FindPassword = () => {    
   
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");

    const onNameHandler = (e) =>{
        setName(e.currentTarget.value);
    }

    const onEmailHandler = (e) =>{
        setEmail(e.currentTarget.value);
    }

    const onSubmitHandler= (e) =>{
        e.preventDefault();
        //이메일 이름으로 유저 찾기
        //있다면 비밀번호 찾는 모달창
    }

    return (
        <div>
            <Imgbox src='/images/findPasswordImage.PNG'/>
            <from onSubmit={onSubmitHandler}>
                이메일<input  value ={ email } type ="text"  placeholder={email} onChange={onEmailHandler} /><br/>
                이름<input value = { name } type = "text" placeholder={name} onChange={onNameHandler} /> <br/>
                <button type="submit"> 찾기 </button><br/>
                <UserButtonComp textValue ="로그인하러가기" handleClick ="login"></UserButtonComp>
            </from>
            
        </div>
    );
};

export default FindPassword;