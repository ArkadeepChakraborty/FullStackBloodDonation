import React, { useEffect } from 'react'

const Payment = () => {

    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
         document.body.appendChild(script);
       });
    };
    
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
    });

    const donate = () =>{
        var options = {
            "key": "rzp_test_ND81BEh4gRO77Q", // Enter the Key ID generated from the Dashboard
            "amount": 100*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Blood Donation Camp", //your business name
            "description": "Donation for Charity",
            "image": "https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg",
            "handler": function (response){
                alert("Payment Success, Your Transaction id: "+response.razorpay_payment_id);
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

  return (
    <div className="payment-container">
      <h1>Donate Here</h1>
      
      <button onClick={donate}>Donate 100 Rs.</button>
    </div>
  )
}

export default Payment