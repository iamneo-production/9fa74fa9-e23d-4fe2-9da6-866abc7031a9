import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Admin = () => {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        axios.get('http://localhost:3001/contact')
            .then(response => {
                setTableData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [currentPage]);

    const handleViewDetails = (id) => {
        console.log(`View row with ID: ${id}`);
        navigate(`/view/${id}`);
    };

    const handleEditDetails = (id) => {
        console.log(`Editing row with ID: ${id}`);
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/contact/${id}`)
            .then(response => {
                console.log(`Deleted row with ID: ${id}`);
                setTableData(prevData => prevData.filter(row => row.id !== id));
                toast.info('Contact form deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting contact:', error);
            });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTableData = tableData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-title">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="contact-form">
                <div className="contact-form-title">
                    <h1>List of Contact Form</h1>
                </div>
                <div className="table-count">
                    <strong>Total Contact Form:</strong> {tableData.length}
                </div>
                <div className="center-table">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: '2%' }}>ID</th>
                                <th style={{ width: '5%' }}>Name</th>
                                <th style={{ width: '5%' }}>Email</th>
                                <th style={{ width: '10%' }}>Subject</th>
                                <th style={{ width: '22%' }}>Message</th>
                                <th style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((row) => (
                                <tr key={row.id}>
                                    <td style={{ width: '2%' }}>{row.id}</td>
                                    <td style={{ width: '5%' }}>{row.name}</td>
                                    <td style={{ width: '5%' }}>{row.email}</td>
                                    <td style={{ width: '10%' }}>{row.subject}</td>
                                    <td style={{ width: '22%' }}>{row.message}</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}>
                                        <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', width: '40px' }}
                                            onClick={() => handleViewDetails(row.id)}><VisibilityIcon /></button>
                                        <span style={{ color: '#666', fontSize: '30px' }}> | </span>
                                        <button style={{ backgroundColor: 'green', color: 'white', height: '30px', width: '40px' }}
                                            onClick={() => handleEditDetails(row.id)}><EditIcon /></button>
                                        <span style={{ color: '#666', fontSize: '30px' }}> | </span>
                                        <button style={{ backgroundColor: 'red', color: 'white', height: '30px', width: '40px' }}
                                            onClick={() => handleDelete(row.id)}><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    {currentPage > 1 && (
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='previous-button'>
                            <NavigateBeforeIcon />
                        </button>
                    )}
                    <span><strong>{currentPage}</strong></span>
                    {currentTableData.length >= itemsPerPage && (
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentTableData.length < itemsPerPage}
                            className='next-button'>
                            <NavigateNextIcon />
                        </button>
                    )}
                </div>
            </div>
        </div>


    );
};

export default Admin;