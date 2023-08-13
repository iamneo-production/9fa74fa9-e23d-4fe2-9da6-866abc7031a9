import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleValidation = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.subject) {
            errors.subject = 'Subject is required';
        }

        if (!formData.message) {
            errors.message = 'Message is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            try {
                const response = await axios.post('http://localhost:3001/contact', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    console.log('Form submitted successfully', formData);
                    setTimeout(() => {
                        setSubmissionStatus('Form submitted successfully');
                      }, 1000);
                    setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                    });
                } else {
                    console.log('Form submission failed');
                    setTimeout(() => {
                        setSubmissionStatus('Form submission failed');
                      }, 1000);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            setSubmissionStatus('Form has validation errors');
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
            </div>
            <div>
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                />
                {formErrors.subject && <span className="error">{formErrors.subject}</span>}
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
                {formErrors.message && <span className="error">{formErrors.message}</span>}
            </div>
            <button type="submit">Submit</button>
            {submissionStatus && <p>{submissionStatus}</p>}

        </form>
    );
}

export default ContactForm;
