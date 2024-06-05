// src/components/WelcomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginScreen  from './formsign/LoginScreen'

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleStudentClick = () => {
        navigate('/login?role=student');
    };

    const handleTeacherClick = () => {
        navigate('/login?role=teacher');
    };

    return (
        <Container className="text-center mt-5">
            <h1>Welcome to admin</h1>
            <LoginScreen />
        </Container>
    );
};

export default WelcomePage;
