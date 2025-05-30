import React from 'react';
import './App.css';
import './CSS/Container.css';

const Container = () => {
  return (
    //{/* Alternating Sections */}
    <div style={{ marginTop: '-50px' }}>
      <div className="container my-5">
        {/* Section 1 */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="images/left-image.jpg" alt="Image Left" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h2>Why Donate Blood?</h2>
            <p style={{ color: 'black' }}>
              Donating blood saves lives and helps patients suffering from severe health conditions.
              It’s a simple and noble act that makes a huge difference.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.href = '/about'}>
              Learn More
            </button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <img src="images/right-image.jpg" alt="Image Right" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6 order-md-1">
            <h2>Become a Donor Today</h2>
            <p style={{ color: 'black' }}>
              Becoming a blood donor is simple and safe. Join our network of heroes and make a positive impact in the world.
            </p>
            <button 
              className="btn btn-primary" 
              style={{ color: 'white' }} 
              onClick={() => window.location.href = '/doner'}>
              Get Started
            </button>
          </div>
        </div>
        <h4 style={{marginLeft:'370px',marginBottom:'40px'}}><b>Medical purposes, where we need blood transfusions</b></h4>
      </div>
    </div>
  );
}

export default Container;
