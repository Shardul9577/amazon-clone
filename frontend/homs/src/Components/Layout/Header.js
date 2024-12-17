import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.userDetail);

  const loginHandler = () => {
    // Assuming 'user' is the correct object holding user details
    if (user && user._id) {
      navigate(`/users/${user._id}`);
    } else {
      navigate("/user/login");
    }
  };

  return (
    <div>
      <nav class='navbar navbar-expand-lg bg-body-tertiary container nav-Header'>
        <div class='container-fluid'>
          <a class='navbar-brand' href='#'>
            <img className='logo-nav' src='/Images/Logo.png' />
          </a>
          <button
            class='navbar-toggler nav-logo-button'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i class='fa-solid fa-bars' style={{ color: "white" }}></i>
          </button>
          <div
            class='collapse navbar-collapse nav-other-details'
            id='navbarSupportedContent'
          >
            <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
              <li class='nav-items'>
                <Link class='nav-link' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              {/* <li class='nav-items'>
                <Link class='nav-link' to='/aboutus'>
                  About Us
                </Link>
              </li> */}
              <li class='nav-items'>
                <Link class='nav-link' to='/products'>
                  Products
                </Link>
              </li>
              {/* <li class='nav-items'>
                <Link class='nav-link' to='/contactus'>
                  Contact Us
                </Link>
              </li> */}
              {/* <li class="nav-items">
                    <a class="nav-link" onClick={loginHandler} ><i class="fa-solid fa-user" style={{color:"#ffffff"}}></i></a>
                    </li>
                    <li class="nav-items">
                    <Link class="nav-link" to="/contactus"><i class="fa-solid fa-cart-shopping" style={{color:"#ffffff"}}></i></Link>
                    </li> */}
            </ul>
          </div>
          <div id="user-btn" class='d-flex'> 
              {user && user._id ? <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li class='nav-item dropdown'>
                    <a
                      class='nav-link dropdown-toggle'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img
                        className='head-user-avatar'
                        src={user?.avatar?.url}
                      />
                    </a>
                    <ul class='dropdown-menu'>
                      <li>
                        <a class='dropdown-item' onClick={loginHandler}>
                          <i class='fa-solid fa-user'></i> Account
                        </a>
                      </li>
                      <li>
                        <Link class='dropdown-item' to={`/orders/user/myorders/${user._id}`}>
                          <i class='fa-solid fa-cart-shopping'></i> Orders
                        </Link>
                      </li>
                        {user?.role === "admin" && 
                          <li>
                            <Link to='/dashboard' class='dropdown-item' href='#'>
                              <i class='fa-solid fa-table-columns'></i> Dashboard
                            </Link>
                          </li>
                        }
                    </ul>
                  </li>
               </ul>  : <button type="button" onClick={()=>navigate("/user/login")} class="btn btn-outline-light">Login / Register</button>}
          </div>
        </div>
      </nav>
    </div>
  );
}
