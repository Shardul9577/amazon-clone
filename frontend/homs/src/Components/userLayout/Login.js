import React, { useEffect, useState} from 'react'
import '../userlayoutCss/Login.css'
import { getUsersLoginAction } from '../../Actions/userActions'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Login() {

    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading , error , loginuser } = useSelector(state => state.usersLogin)

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errorMessage, setErrorMessage] = useState("");
    
    const loginHandler = async() => {

        try {
            await dispatch(getUsersLoginAction(email,password))

            if (loginuser) {
                navigate(`/users/${loginuser._id}`);
            }

            if (error) {
                setErrorMessage('You have typed incorrect email or password') 
            }
            
        } catch (error) {
           console.error(error)   
        }
    }; 


    const registerHandler = ()=>{
        navigate(`/user/new`);
    }
    
    // console.log(user,"user");

  return (
    <div className='login-page' >
        <div className='login-page-box container'>
            <h1 className='login-page-box-head'>LOGIN</h1>
                {errorMessage &&
            <div style={{marginTop:"5%"}} class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{errorMessage}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <div className='login-page-box-main'>
                <img className='login-page-box-main-img' src='/Images/Login.jpg'></img>
                <div className='login-page-box-main-2'>
                    <h1 className='login-page-box-main-2-head'>Welcome Back :)</h1>
                    <p className='login-page-box-main-2-para'>To keep connected with us login with your personal <br/> information by email address and password.</p>
                    <hr/>
                    <input type="text" class="form-control login-page-box-main-2-input" placeholder="Email" name='Email' onChange={(e)=>setEmail(e.target.value)} aria-label="Email"/>
                    <input type="password" class="form-control login-page-box-main-2-input" placeholder="Password" name='Password' onChange={(e)=>setPassword(e.target.value)} aria-label="Password"/>
                    <p style={{textAlign:"right" , color:"blue" , marginTop:"2%" , cursor:"pointer"}}>forget password ?</p>
                    <div className='login-page-box-main-2-buttons'>
                        <button type="button" id="liveToastBtn" onClick={loginHandler} class="btn btn-outline-success">Login Now</button>
                        <button type="button" class="btn btn-outline-dark" onClick={registerHandler}>Register Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
