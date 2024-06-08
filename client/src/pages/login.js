import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../app/context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { user, setUser, googleSignIn, logOut } = useAuth();
  const [ loading, setLoading ] = useState(true);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');


  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    const payload = {
      email,
      password
    };

    axios.post('/auth/login', payload, {
      headers: {
        "accepts": "application/json",
      }
    }).then(response => {
      console.log(response);
      setUser(response.data);
      router.push('/profile/page');
    }).catch(error => {

    });
  };
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Paper className="p-8 w-full max-w-md">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={ handleLogin } className="space-y-4">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
          { error && <Typography color="error">{ error }</Typography> }
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Button className='mt-4' type="submit" variant="text" color="primary" fullWidth
          onClick={ handleSignIn }>
          Login with google
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
