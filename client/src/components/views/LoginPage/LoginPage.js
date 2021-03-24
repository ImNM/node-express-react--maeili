import axios from 'axios';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action.js';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(res => {
            console.log(res.payload);
            console.log(res.payload.loginSucces);
            if(res.payload.loginSucces){
                props.history.push('/');
            }else{
                alert('ERROR');
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'
        }}>
            <form style = {{display:'flex',flexDirection:'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {onEmailHandler} />
                <label>Password</label>
                <input type = "password" value ={Password} onChange = {onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage




//--------------------------------------------------------------------------------
// 추가할것 formik & yup  make your system dynamic
// 2021-03-24 20시
//--------------------------------------------------------------------------------