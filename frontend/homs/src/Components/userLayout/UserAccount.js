import React, { useEffect } from 'react'
import '../userlayoutCss/UserAccount.css'
import { getUserDetailAction } from '../../Actions/userActions'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UserAccount() {

    const { _id } = useParams();
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userDetail)


    console.log(_id,"<=============id")
    console.log(user,"<=============userdetail")

    useEffect(()=>{
        dispatch(getUserDetailAction(_id))
    },[dispatch,_id])

  return (
    <div className='user-account'>
        <div className='user-account-box container'>
        {user ? 
        <>
            <img className='user-account-avatar' src={user?.avatar?.url}/>
            <div className='user-account-details'>
                <img className='user-account-details-img' src='/Images/profile.svg'/>
                <div className='user-account-details-box'>
                    <h1 className='user-account-details-head'>{user?.name}</h1>
                    <p className='user-account-details-subhead'>Account Holder</p>
                    <hr className='container'></hr>
                    <h5 className='user-account-details-text'>Name : <span style={{color:"blue"}}>{user?.name}</span></h5>
                    <h5 className='user-account-details-text'>Email : <span style={{color:"blue"}}>{user?.email}</span></h5>
                    {/* <h5 className='user-account-details-text'>Password : <span style={{color:"blue"}}>password</span></h5> */}
                    <h5 className='user-account-details-text'>Role : <span style={{color:"blue"}}>{user?.role}</span></h5>
                    <div className='user-account-details-buttons'>
                        <button type="button" class="btn btn-outline-success">Edit</button>
                        <button type="button" class="btn btn-outline-danger">Log out</button>
                    </div>
                </div>
            </div> 
            <div className='user-account-more-details'>
                <h1 className='user-account-more-details-head'>More Details</h1>
                <div className='user-account-more-details-cards'>

                    <div class="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                        <div class="card-header"><i class="fa-solid fa-shield-halved" style={{color: "#000000"}}></i></div>
                        <div class="card-body">
                            <h5 class="card-title">Login & Security</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                    <div class="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                        <div class="card-header"><i class="fa-solid fa-cart-shopping" style={{color:"#000000"}}></i></div>
                        <div class="card-body">
                            <h5 class="card-title">Your Orders</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                    <div class="card border-dark mb-3" style={{maxWidth: "18rem"}}>
                        <div class="card-header"><i class="fa-solid fa-phone" style={{color:"#000000"}}></i></div>
                        <div class="card-body">
                            <h5 class="card-title">Customer Service</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                </div>
            </div> 
        </>
        : <p>No details are there !</p>} 
        </div>  
    </div>
  )
}

export default UserAccount