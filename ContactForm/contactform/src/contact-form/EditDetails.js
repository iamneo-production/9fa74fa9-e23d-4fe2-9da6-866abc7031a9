import React, { useState, useEffect } from 'react';
import { useParams, Link,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/contact/${id}`)
            .then(response => {
                setContact(response.data);
            })
            .catch(error => {
                console.error('Error updating contact:', error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:3001/contact/${id}`, contact)
            .then(response => {
                console.log('Contact updated:', response.data);
                toast.success('Contact updated successfully');
                setTimeout(() => {
                    navigate('/admin');
                  }, 1000); 
            })
            .catch(error => {
                console.error('Error updating contact:', error);
                toast.error('Error updating contact');
            });
    };

    const handleCancel = () => {
        toast.info('Editing canceled');
    };

    return (
        <div className="edit-details-container center">
            <div className="edit-details">
                <h2>Edit Contact Details of {contact.name}</h2>
                <form onSubmit={handleEditSubmit}>
                    <div className="detail-two">
                        <label htmlFor="name"><strong>Name:</strong></label>
                        <input type="text" id="name" name="name" value={contact.name} className="detail-value-two" onChange={handleInputChange} />
                    </div>
                    <div className="detail-two">
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" id="email" name="email" value={contact.email} className="detail-value-two" onChange={handleInputChange} />
                    </div>
                    <div className="detail-two">
                        <label htmlFor="subject"><strong>Subject:</strong></label>
                        <input type="text" id="subject" name="subject" value={contact.subject} className="detail-value-two" onChange={handleInputChange} />
                    </div>
                    <div className="detail-two">
                        <label htmlFor="message"><strong>Message:</strong></label>
                        <textarea id="message" name="message" value={contact.message} className="detail-value-two-message" onChange={handleInputChange} />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="save-button">Update</button>
                        <Link to="/admin" className="cancel-button" onClick={handleCancel}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDetails;