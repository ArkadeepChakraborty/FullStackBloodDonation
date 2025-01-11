import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Css/Admin.css";

const AdminAbout = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [points, setPoints] = useState([]);
    const [newPoint, setNewPoint] = useState('');

    useEffect(() => {
        // Fetch the current content
        axios.get('http://localhost:5000/admin/about')
            .then(response => {
                const { title, content, points } = response.data || {};
                setTitle(title || '');
                setContent(content || '');
                setPoints(points || []);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSave = () => {
        // Update the content
        axios.put('http://localhost:5000/admin/about', { title, content, points })
            .then(() => alert('Content Updated Successfully!'))
            .catch(err => console.error(err));
    };

    const handleAddPoint = () => {
        if (newPoint) {
            setPoints([...points, newPoint]);
            setNewPoint('');
        }
    };

    const handleEditPoint = (index, updatedPoint) => {
        const updatedPoints = [...points];
        updatedPoints[index] = updatedPoint;
        setPoints(updatedPoints);
    };

    const handleDeletePoint = (index) => {
        const updatedPoints = points.filter((_, i) => i !== index);
        setPoints(updatedPoints);
    };

    return (
        <div className="admin-about-container">
            <h2>Edit About Page Content</h2>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ width: '100%', marginBottom: '10px' }} 
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    rows="5" 
                    style={{ width: '100%', marginBottom: '10px' }} 
                />
            </div>
            <div>
                <label>Points:</label>
                <div>
                    <ul className="points-list">
                        {points.map((point, index) => (
                            <li key={index} className="point-item">
                                <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => handleEditPoint(index, e.target.value)}
                                    className="point-input"
                                />
                                <button
                                    onClick={() => handleDeletePoint(index)}
                                    className="d-button"
                                    style={{marginBottom:'16px'}}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <input 
                    type="text" 
                    value={newPoint} 
                    onChange={(e) => setNewPoint(e.target.value)} 
                    placeholder="Add a point" 
                />
                <button onClick={handleAddPoint} style={{ marginLeft: '3px', backgroundColor: 'green', color: 'white' }}>
                    Add Point
                </button>
            </div>
            <button onClick={handleSave} style={{ marginTop: '20px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
                Save Changes
            </button>
        </div>
    );
};

export default AdminAbout;
