import React from 'react'
import '../css/Footer.css'

export default function Footer() {
  return (
    <>
    <div className='footer-page'>
      <div className='footer-page-1'>
        <h1 className='footerpage-heading'>Download Now</h1>
        <h4 className='footerpage-heading-download container'>For Android</h4>
        <img className='footerpage-image-download' src='/Images/playStore.png'/>
        <h4 className='footerpage-heading-download container'>For Apple</h4>
        <img className='footerpage-image-download' src='/Images/appStore.png'/>
        <img/>
      </div>
      <div className='footer-page-2'>
        <h1 className='footerpage-heading-1'>SN DIGITALS</h1>
      </div>
      <div className='footer-page-3'>
        <h1 className='footerpage-heading'>Follow Us</h1>
        <h5 className='footer-followup-links'><i class="fa-brands fa-youtube"></i> Youtube</h5>
        <h5 className='footer-followup-links'><i class="fa-brands fa-instagram"></i> Instagram</h5>
        <h5 className='footer-followup-links'><i class="fa-brands fa-linkedin"></i> Linkedin</h5>
        <h5 className='footer-followup-links'><i class="fa-brands fa-twitter"></i> Twitter</h5>
      </div>
    </div>
    <div className='footer-page-end-2'>
    <p className='footerpage-para-1'>All the &copy; copyrights reserved by Shardul Chaudhary</p>
    </div>
    </>
  )
}
