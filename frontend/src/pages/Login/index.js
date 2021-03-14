import React , {useState} from 'react';

import UserButtonComp from '../../components/ButtonComp/UserButtonComp';
import Imgbox from '../../components/Image/Imgbox';
import InputComp from '../../components/InputComp/InputComp';


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
      };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
      };
    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('Email', email);
        console.log('Password', password);
        // axios.post(`${process.env.REACT_APP_HOST}/account/login`, {
        //     email,
        //     password
        //   }
        //   ).then(res => {
        //     if (res.data.response === "success") {
        //         localStorage.setItem('email', res.data.data.email);
        //         localStorage.setItem('name', res.data.data.name);
        //         console.log(res.data.data);
                
        //         props.history.push({
        //             pathname: '/home'
        //           })
        //     }
        //     else {
        //         alert('ID와 PW가 일치하지 않습니다.^0^')
        //       }
        //     }).catch(err => {
        //       console.log(err);
        //       alert('다시해^0^')
        //     })
        };
        

    return (
        <div>
            <Imgbox src='/images/loginImage.PNG'/>
            <form onSubmit={onSubmitHandler}>
                <InputComp type="email" placeholder="Email" onChange ={onEmailHandler}></InputComp><br/>
                <input  value={password} placeholder="PW" type="password"  onChange={onPasswordHandler} /><br/>
                <button type ="submit">로그인</button>
            </form>
            <UserButtonComp textValue ="회원가입" handleClick='register'></UserButtonComp>
        </div>
    );
};

export default Login;