import React,{useState} from 'react';
import Imgbox from '../../components/Image/Imgbox';
   
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';


const Confirm = () => {

    
    const [password,setPassword] = useState("");
    

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };



 

    return (
        <div>
            <Imgbox src='/images/confirmImage.PNG'/>            
            비밀번호
            <input type ="password" placeholder="비밀번호 확인" value ={password} onChange={onPasswordHandler} /><br/>
            <UserButtonComp textValue ="확인" handleClick ="goDelete" data={password}></UserButtonComp>         
        </div>
    );
};

export default Confirm;