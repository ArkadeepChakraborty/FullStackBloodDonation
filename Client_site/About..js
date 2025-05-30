// import React from 'react';
// import './CSS/About.css'; // Assuming you will style it separately

// const About = () => {
//     return (
//         <div className="about-container" style={{marginBottom:'80px'}}>
//             <div className="about-right">
//                 <img src="images/Bg.jpg" alt="Blood Donation" className="about-image" />
//             </div>
//             <div className="about-left">
//                 <h2>Why Do We Need Blood?</h2>
//                 <p>
//                     Blood is essential to life. It transports oxygen and nutrients to our organs and tissues,
//                     helps fight infections, and enables our body to heal. Every few seconds, someone needs blood:
//                 </p>
//                 <ul>
//                     <li>To treat cancer patients during chemotherapy.</li>
//                     <li>For surgeries and organ transplants.</li>
//                     <li>For individuals with chronic illnesses such as sickle cell anemia.</li>
//                     <li>To save lives during accidents and emergencies.</li>
//                 </ul>
//                 <p>
//                     Donating blood is a simple, safe process that can make a huge difference. Your one donation can
//                     save up to three lives!
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default About;


import React, { useState, useEffect } from 'react';
import './CSS/About.css';

const About = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/admin/about')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="about-container" style={{ marginBottom: '130px' }}>
            <div className="about-left">
                <img src="images/Bg.jpg" alt="Blood Donation" className="about-image" />
            </div>
            <div className="about-right">
                {loading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <>
                        <h2>{data.title}</h2>
                        <p>{data.content}</p>
                        <ul>
                            {data.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default About;
