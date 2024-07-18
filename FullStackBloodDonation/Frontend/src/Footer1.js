import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';


const Footer1 = () => {
  return (
    // <div className='footer'>
    //     <h5><b>Be the reason for someone's heartbeat.</b></h5>
    // </div>
  
    <div style={{marginTop: '2%'}}>
  {/* Remove the container if you want to extend the Footer to full width. */}
  {/* //<div className="container my-5"> */}
    
    <footer className="text-center text-lg-start text-white" style={{backgroundColor: '#000000'}}>
      
      <div className="container p-4 pb-0">
        
        <section className>
          
          <div className="row">
            
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Vountary Blood Donation Organization
              </h6>
              <p>
                Here you can donate bloods and take bloods form here anytime to save a innocent's life.
                <p><b>Be the reason for someone's heartbeat.</b></p>
              </p>
            </div>
            
            <hr className="w-100 clearfix d-md-none" />
            
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Terms</h6>
              <p>
                <a className="text-white">Bloodgroup</a>
              </p>
              <p>
                <a className="text-white">User</a>
              </p>
              <p>
                <a className="text-white">Doner</a>
              </p>
              <p>
                <a className="text-white">Blood Donation</a>
              </p>
            </div>
            
            <hr className="w-100 clearfix d-md-none" />
            <hr className="w-100 clearfix d-md-none" />
          
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-home mr-3" /> Kolkata, BG 10012, West Bengal</p>
              <p><i className="fas fa-envelope mr-3" /> info@gmail.com</p>
              <p><i className="fas fa-phone mr-3" /> + 01 234 567 88</p>
              <p><i className="fas fa-print mr-3" /> + 01 234 567 89</p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
              {/* Facebook */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#3b5998'}} href="#!" role="button"><i className="fab fa-facebook-f" /></a>
              {/* Twitter */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#55acee'}} href="#!" role="button"><i className="fab fa-twitter" /></a>
              {/* Google */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#dd4b39'}} href="#!" role="button"><i className="fab fa-google" /></a>
              {/* Instagram */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#ac2bac'}} href="#!" role="button"><i className="fab fa-instagram" /></a>
              {/* Linkedin */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#0082ca'}} href="#!" role="button"><i className="fab fa-linkedin-in" /></a>
              {/* Github */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#333333'}} href="#!" role="button"><i className="fab fa-github" /></a>
            </div>
          </div>
          
        </section>
      </div>
      <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        © 2020 Copyright :
        <a className="text-white"> Blooddonation.com</a>
      </div>
    </footer>
  
</div>
  )

}

export default Footer1