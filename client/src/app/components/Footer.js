import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box py={ 3 } textAlign="center" className='dark:bg-gray-900 bg-gray-100 dark:text-white text-black border-t dark:border-gray-400 border-gray-300'>
      <Typography variant="body1">
        © 2024 WhatToDo. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;