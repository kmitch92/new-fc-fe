'use client';
import React, { useState } from 'react';
import Login from '@/components/Login';
import Register from '@/components/Register';

const LoginHero = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  return (
    <div className="hero min-h-screen bg-base-100">
      {isLoggingIn ? (
        <Login setIsLoggingIn={setIsLoggingIn} />
      ) : (
        <Register setIsLoggingIn={setIsLoggingIn} />
      )}
    </div>
  );
};

export default LoginHero;
