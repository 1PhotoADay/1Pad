import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Container } from '@mui/material';
import SearchBox from './SearchBox';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const userId =
    localStorage.getItem('userId') !== null
      ? localStorage.getItem('userId')
      : '12';
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleClick = () => {
    fetch(`/api/${userId}/tags?tags=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
      });
  };

  const omitError = (id) => {
    const newResult = searchResult.filter((el) => el.id !== id);
    setSearchResult(newResult);
  };
  return (
    <Container
      maxWidth='lg'
      sx={{
        marginTop: 10,
        marginBottom: '56px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          alignItems: 'center',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='outlined-search'
          label='Search field'
          type='search'
          onChange={handleInputChange}
        />
        <label htmlFor='icon-button-file'>
          <IconButton
            color='primary'
            aria-label='search'
            component='span'
            onClick={handleClick}
          >
            <SearchIcon />
          </IconButton>
        </label>
      </Box>
      <SearchBox images={searchResult} handleError={omitError} />
    </Container>
  );
}

export default Search;
