"use client"

import React, { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';





export default  function SearchBar({ onSearchChange }) {
  


    const handleInputChange = (e) => {
      const value = e.target.value;
      onSearchChange(value); // send the value to Header
    };

  return (
    <OutlinedInput
            id="outlined-adornment-weight"
            onChange={handleInputChange}
            endAdornment={<InputAdornment position="end"><SearchOutlinedIcon/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
  )
}
