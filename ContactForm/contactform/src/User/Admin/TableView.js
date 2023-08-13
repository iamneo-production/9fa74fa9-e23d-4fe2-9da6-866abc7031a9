import React, { useEffect, useState } from 'react'
import Login from './Login';
import ContactForm from './ContactForm'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import Telegram from '../Image/telegram-rise2-2.gif'
import TableView from './Admin/TableView';
export default function () {
  const { collapseSidebar } = useProSidebar();
  const [loginpage, setLoginpage] = useState(false);
  const [contactFormpage, setContactFormpage] = useState(false);
  const [widthCollapse,setWidthCollapse] = useState(true);
  const [adminTableView,setAdminTableView] = useState(false);
  useEffect(()=>{
    if(loginpage){
      setAdminTableView(false)
    }
  },[loginpage])
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar style={{ height: "100vh",width:widthCollapse?'280px':''}}>
        <Menu >
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              widthCollapse === true ?setWidthCollapse(false):setWidthCollapse(true)
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            {/* <h2> <img src={download1} style={{width:'48px',height:'55px'}}/></h2> */}
            <div><h5><TelegramIcon style={{ fontSize: '30px', color: '#1976d2' }} /> Contact Form</h5></div>
          </MenuItem>

          <MenuItem icon={<HomeOutlinedIcon onClick={()=>{setLoginpage(true); setContactFormpage(false) }} style={{color:'#1976d2'}}/>}><Button onClick={()=>{setLoginpage(true); setContactFormpage(false) }}>Login</Button></MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon onClick={() => { setContactFormpage(true); setLoginpage(false) }} style={{color:'#1976d2'}} />}><Button onClick={() => { setContactFormpage(true); setLoginpage(false) }}>Contact Form</Button></MenuItem>
          <img src={Telegram} style={{ width: '279px', height: '589px', marginRight: '20px' }} />
        </Menu>
      </Sidebar>
      <main style={{ marginLeft: '250px' }}>
        <h1 style={{ color: "Black", marginLeft:adminTableView ? "-8rem" :"10rem" }}>
          <div><h2><TelegramIcon style={{ fontSize: '50px', color: '#1976d2' }} /> Contact Form</h2></div>
          {loginpage ? <Login setLoginpage={setLoginpage} loginpage={loginpage} setAdminTableView={setAdminTableView}/> : ''}
          {contactFormpage ? <ContactForm /> : ''}
          {adminTableView ? <TableView></TableView> :''}
        </h1>
      </main>
    </div>
  )
}
