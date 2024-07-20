import React, { useEffect } from 'react'
import Slider from './Slider'
import Footer1 from './Footer1'



const Homeone = () => {

    useEffect(() =>{
      
    },[])

  return (

    <div>
        <Slider></Slider>
        <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100">
      <img src="images/human1.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Abhishek Kumar</h5>
        <p class="card-text">He is a seven year old boy. He is suffered form <b>Anemia</b>,his blood of group is <b>A+</b>.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="images/human2.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Alexa Perry</h5>
        <p class="card-text">She is a Thirty three year old matured woman. She is suffered form <b>kidney disease</b>,her blood of group is <b>O+</b>.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="images/human4.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Andre Smith</h5>
        <p class="card-text">He is a Twenty eight year old matured man. He is suffered form <b>leukemia</b>,his blood of group is <b>AB+</b>.</p>
      </div>
       <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small> 
      </div>
    </div>
  </div>
</div>
 </div>

  )
}

export default Homeone