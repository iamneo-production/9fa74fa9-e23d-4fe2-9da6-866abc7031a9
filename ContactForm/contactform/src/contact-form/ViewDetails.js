import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:3001/contact/${id}`)
                .then(response => {
                    setContact(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching contact details:', error);
                });
        }, 1000);
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    const handleBack = () => {
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      };

    return (
        <div className="view-details-container">
            <div className="view-details">
                <h2>Contact Details of {contact.name}</h2>
                <div className="detail">
                    <strong>Name:</strong>
                    <div className="detail-value">{contact.name}</div>
                </div>
                <div className="detail">
                    <strong>Email:</strong>
                    <div className="detail-value">{contact.email}</div>
                </div>
                <div className="detail">
                    <strong>Subject:</strong>
                    <div className="detail-value">{contact.subject}</div>
                </div>
                <div className="detail">
                    <strong>Message:</strong>
                    <div className="detail-value-message">{contact.message}</div>
                </div>
                <div className="back-button-container">
                    
                    <button className="back-button" onClick={handleBack}>
                    <strong style={{fontSize: '20px'}}><ArrowBackIcon />Back</strong></button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
