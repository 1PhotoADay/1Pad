import React, { useState } from 'react';
import S3FileUpload from 'react-s3';
import { DateTime } from 'luxon';
import {
  Input,
  Button,
  Box,
  TextField,
  Paper,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
window.Buffer = window.Buffer || require('buffer').Buffer;

import config from '../S3UploadComponent';

function AddPhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  let image = null;
  let tempImgUrl = null;
  let date = location.state.date ? location.state.date : new Date();
  let s3Url = 'https://1pad.s3.amazonaws.com/samplePhoto.jpeg';
  let desc = '';
  let tags = '#happy';
  let photoId = null;
  let headline = 'Add a photo 📷';

  if (location.state.id) {
    headline = 'Edit photo';
    photoId = location.state?.id;
    image = location.state?.img;
    tempImgUrl = location.state?.img;
    // date = location.state?.date;
    s3Url = location.state?.img;
    desc = location.state?.comments;
    tags = location.state?.tags;
  }
  const [formState, setFormState] = useState({
    image,
    tempImgUrl,
    date,
    s3Url,
    desc,
    tags,
  });

  const userId =
    localStorage.getItem('userId') !== null
      ? localStorage.getItem('userId')
      : '12';
  function onImageChange(e) {
    setFormState({
      ...formState,
      image: e.target.files[0],
      tempImgUrl: URL.createObjectURL(e.target.files[0]),
    });
  }
  function handleImageUpload() {
    S3FileUpload.uploadFile(formState.image, config)
      .then((data) => {
        setFormState({ ...formState, s3Url: data.location });
        console.log(data);
      })
      .catch((err) => alert(err));
  }

  function handleSubmit() {
    const postUrl = `/api/${userId}`;
    // handleImageUpload()
    //   .then((data) =>
    //     fetch(postUrl, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         comments: formState.desc,
    //         url: formState.s3Url,
    //         tags: formState.tags,
    //         takenAt: formState.date,
    //       }),
    //     })
    //   )
    fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comments: formState.desc,
        url: formState.s3Url,
        tags: formState.tags,
        takenAt: formState.date,
      }),
    })
      //   .then((data) => data.json())
      .then((res) => navigate('/dashboard'));
  }
  function handleEdit() {
    const patchUrl = `/api/${userId}/photos?photoId=${photoId}`;
    // if image has been updated
    // if(formState.tempImgUrl !== formState.s3Url){
    //     handleImageUpload().then(data => fetch(patchUrl, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           comments: formState.desc,
    //           url: formState.s3Url,
    //           tags: formState.tags,
    //           takenAt: formState.date,
    //         }),
    //       })).then((res) => navigate('/dashboard'));
    // }

    fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comments: formState.desc,
        url: formState.s3Url,
        tags: formState.tags,
        takenAt: formState.date,
      }),
    }).then((res) => navigate('/dashboard'));
  }

  function handleDelete() {
    const deleteUrl = `/api/${userId}/photos?photoId=${photoId}`;
    fetch(deleteUrl, {
      method: 'DELETE',
    }).then((res) => navigate('/dashboard'));
  }

  const cancelBtn = (
    <Link to='/dashboard' style={{ textDecoration: 'none', color: 'grey' }}>
      <Button variant='text'>Cancel</Button>
    </Link>
  );
  const uploadBtns = (
    <>
      <Button variant='text' onClick={handleSubmit}>
        Upload
      </Button>
      {cancelBtn}
    </>
  );

  const editBtns = (
    <>
      <Button variant='text' onClick={handleEdit}>
        Update
      </Button>
      <Button variant='text' onClick={handleDelete}>
        Delete
      </Button>
      {cancelBtn}
    </>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Paper sx={{ p: 5 }} elevation={3}>
        <Typography variant='h6' mb={5}>
          {headline}
        </Typography>
        {formState.tempImgUrl && (
          <Box className='addPhoto'>
            <img style={{ maxWidth: '300px' }} src={formState.tempImgUrl} />
            <Box
              component='div'
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                onClick={() =>
                  setFormState({ ...formState, image: null, tempImgUrl: '' })
                }
              >
                Remove
              </Button>
            </Box>
          </Box>
        )}
        <label htmlFor='contained-button-file'>
          <Input
            accept='image/*'
            id='contained-button-file'
            multiple
            type='file'
            onChange={onImageChange}
            style={{ marginBottom: 10 }}
          />
        </label>
        <Box className='date-picker'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label='Photo taken on'
              value={formState.date}
              onChange={(newValue) => {
                setFormState({ ...formState, date: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin='dense' />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box className='desc'>
          <TextField
            id='outlined-multiline-static'
            label='Description'
            multiline
            rows={4}
            placeholder='Today was...'
            fullWidth
            value={formState.desc}
            margin='dense'
            onChange={(e) =>
              setFormState({ ...formState, desc: e.target.value })
            }
          />
        </Box>
        <Box className='tags'>
          <TextField
            id='outlined-textarea'
            label='Tags'
            placeholder='#bestdayever'
            multiline
            fullWidth
            margin='dense'
            value={formState.tags}
            onChange={(e) =>
              setFormState({ ...formState, tags: e.target.value })
            }
          />
        </Box>
        <Box
          className='submit'
          sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 3 }}
        >
          {location.state.id ? editBtns : uploadBtns}
        </Box>
      </Paper>
    </Box>
  );
}

export default AddPhoto;
