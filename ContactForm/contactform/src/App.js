import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './contact/Admin';
import ViewDetails from './contact/ViewDetails';
import EditDetails from './contact/EditDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/view/:id" element={<ViewDetails />} />
        <Route path="/edit/:id" element={<EditDetails />} />
      </Routes>
      <ToastContainer autoClose={500}/>
    </Router>
  );
}

export default App;
