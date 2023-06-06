import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, []);
  return (
    <div>
      <div style={{ flexDirection: 'column' }} class="d-flex align-items-center justify-content-center vh-100 ">
        <h1 class="display-1 fw-bold text-black">Landing Page</h1>
      </div>
    </div>
  )
}
