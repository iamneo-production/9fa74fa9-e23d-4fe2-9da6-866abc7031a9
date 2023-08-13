import React, { useState,useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function ContactForm() {
    const [errorEmail, setErrorEmail] = useState(false);
    const form = useRef();
    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        console.log({
            email: data.get('email'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            mobileNumber: data.get('mobileNumber'),
            address: data.get('address')

        });
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.get('email'))) {
            setErrorEmail(false)
        } else {
            setErrorEmail(true)
        }
        if(!errorEmail){
             const config = {
                method: 'post',
                url:'http://localhost:3000/contact',
                data:{
                    email: data.get('email'),
                    firstName: data.get('name'),
                    mobileNumber: data.get('subject'),
                    address: data.get('message')
        
                }
             }
            axios(config)
            .then(response =>{
                emailjs.sendForm('service_lok1k9q','template_2goi9dw',form.current,'Q3bDWIKmD1QRbVBOf')
                .then((result)=>{
                    if(result.status === 200){
                        toast('Email sent successfully')
                    }
                    setTimeout(()=>{
                        window.location.reload();
                    },5000)
                },(error)=>{
                    toast(error)
                })
            })
        }
    };
    return (
        <ThemeProvider theme={defaultTheme} >
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PeopleAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Contact Form
                    </Typography>
                    <Box component="form" ref ={form} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            error={errorEmail}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={errorEmail ? 'Incorrect email' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="subject"
                            label="Subject"
                            name="subject"
                            autoComplete="subject"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="message"
                            label="Message"
                            name="message"
                            autoComplete="message"
                            rows={4}
                            autoFocus
                            multiline
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <ToastContainer></ToastContainer>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
