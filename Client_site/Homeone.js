import React, { useEffect } from 'react'
import Slider from './Slider'
//import Footer1 from './Footer1'
import './CSS/Homeone.css';
import Container from './Container';



const Homeone = () => {

    useEffect(() =>{
      
    },[])

  return (

    <div>
        <Slider></Slider>
        <Container></Container>
        <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginTop:'-120px', marginBottom:'30px'}}>
  <div class="col">
    <div class="card h-100">
      <img src="images/BD1.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Anemia</h5>
        <p class="card-text">This is a condition where the body doesn't have enough red blood cells to carry oxygen to the tissues. Anemia can be caused by blood loss, nutritional deficiencies, or other medical conditions.</p>
      </div>
      {/* <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div> */}
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="images/BD2.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Cancer</h5>
        <p class="card-text"> Cancer treatment, such as chemotherapy and radiation therapy, can damage the bone marrow, which produces blood cells. This can lead to anemia, thrombocytopenia, and neutropenia. Blood transfusions may be needed to replace lost blood cells.</p>
      </div>
      {/* <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div> */}
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="images/BD3.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Trauma & Surgerys</h5>
        <p class="card-text">Severe injuries, such as car accidents and gunshot wounds, can cause significant blood loss. Blood transfusions are often necessary to stabilize the patient and prevent death.Besides Major surgeries can also cause blood loss. Blood transfusions may be needed during or after surgery to replace lost blood.</p>
      </div>
       {/* <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small> 
      </div> */}
    </div>
  </div>
</div>
</div>
 

  )
}

export default Homeone