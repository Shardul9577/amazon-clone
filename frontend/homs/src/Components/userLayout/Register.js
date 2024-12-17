import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRegisterAction } from '../../Actions/userActions';
import '../userlayoutCss/Login.css';

function Register() {

  const { userRegister, error } = useSelector(state => state.userRegister);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAvatarChange = (newLink, newLinkId) => {
    setLink(newLink);
    setLinkId(newLinkId);
  };

  const registerHandler = async () => {

    const credentials = {
      name, email, password,
      avatar: {
        public_id: linkId,
        url: link
      },
      role: "user"
    };

    await dispatch(getUserRegisterAction(credentials));

  };
   
  useEffect(()=>{

    if (userRegister && userRegister._id) {
      navigate(`/user/login`);
    }

   else if (error) {
      console.error(error);
      // More refined error handling
      if (error.name) {
        setErrorMessage("Please fill all the details !");
      } else if (error.keyValue) {
        setErrorMessage("This email already exists !");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  },[userRegister,error])

  // ___________________________________________________________________________________
 
   const [formats, setFormats] = React.useState(() => ['purple', 'fav', 'black', 'girl', 'boy']);
   const handleFormat = (event, newFormats) => {
     setFormats(newFormats);
   };

  return (
    <div className='login-page-box container'>

      {errorMessage &&
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>{errorMessage}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>}

      <div className='login-page-box-main'>
        <img className='login-page-box-main-img' src='/Images/Register.jpg' alt='Registration'/>
        <div className='login-page-box-main-2'>
          <h1 className='login-page-box-main-2-head'>Welcome :)</h1>
          <p className='login-page-box-main-2-para'>To keep connected with us register with your personal information by email address and password.</p>
          <hr />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control login-page-box-main-2-input" placeholder="Name" aria-label="Name" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control login-page-box-main-2-input" placeholder="Password" aria-label="Password" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control login-page-box-main-2-input" placeholder="Email" aria-label="Email" />

          <p style={{ textAlign: "start", marginTop: "2%" }}>Avatar :</p>
          <ToggleButtonGroup className='all-register-avatar-images' value={formats} exclusive onChange={handleFormat} aria-label="text formatting">
                        
                        <ToggleButton style={{marginTop:"5%"}} onClick={() => handleAvatarChange("https://static.vecteezy.com/system/resources/previews/019/464/940/original/girl-in-sunglasses-hipster-girl-with-colorful-hair-and-glasses-for-avatar-logo-icon-web-print-media-and-other-with-transparent-background-png.png", "avatar-id-1")} value="purple" aria-label="purple">
                          <img className='register-avatar-images' src='https://static.vecteezy.com/system/resources/previews/019/464/940/original/girl-in-sunglasses-hipster-girl-with-colorful-hair-and-glasses-for-avatar-logo-icon-web-print-media-and-other-with-transparent-background-png.png'/>
                        </ToggleButton>

                        <ToggleButton style={{marginTop:"5%"}}  onClick={() => handleAvatarChange("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29FW9w_cbjKGg2_-n4XNElRBawmpuSRsxkbQ-I5CecIw5IdCdWsk5ytvjuuuiTspk9rc&usqp=CAU", "avatar-id-2")} value="fav" aria-label="fav">
                        <img className='register-avatar-images' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29FW9w_cbjKGg2_-n4XNElRBawmpuSRsxkbQ-I5CecIw5IdCdWsk5ytvjuuuiTspk9rc&usqp=CAU'/>
                        </ToggleButton>

                        <ToggleButton style={{marginTop:"5%"}}  onClick={() => handleAvatarChange("https://static.thenounproject.com/png/2416962-200.png", "avatar-id-3")} value="black" aria-label="black">
                        <img className='register-avatar-images' src='https://static.thenounproject.com/png/2416962-200.png'/>
                        </ToggleButton>

                        <ToggleButton style={{marginTop:"5%"}}  onClick={() => handleAvatarChange("https://cdn.icon-icons.com/icons2/2630/PNG/512/avatar_woman_people_girl_glasses_icon_159125.png", "avatar-id-4")} value="girl" aria-label="girl">
                        <img className='register-avatar-images' src='https://cdn.icon-icons.com/icons2/2630/PNG/512/avatar_woman_people_girl_glasses_icon_159125.png'/>
                        </ToggleButton>

                        <ToggleButton style={{marginTop:"5%"}}  onClick={() => handleAvatarChange("https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png", "avatar-id-5")} value="boy" aria-label="boy">
                        <img className='register-avatar-images' src='https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png'/>
                        </ToggleButton>

          </ToggleButtonGroup>

          <div className='login-page-box-main-2-buttons'>
            <button type="button" onClick={registerHandler} className="btn btn-outline-success">Register Now</button>
            <button type="button" onClick={() => navigate('/user/login')} className="btn btn-outline-dark">Login Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
