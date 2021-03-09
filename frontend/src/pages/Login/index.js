import React , {useState} from 'react';
//import { Redirect, useHistory } from 'react-router-dom';


const Login = () => {

    //const history = useHistory()

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
            <img src = "/images/loginImage.PNG"  alt = "사진입니다."/>
            <form onSubmit={onSubmitHandler}>
                <input value={email} placeholder="ID" type="text"  onChange={onEmailHandler} />
                <input value={password} placeholder="PW" type="password"  onChange={onPasswordHandler} />
                <button type ="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;