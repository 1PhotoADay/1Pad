import React, { useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import S3FileUpload from 'react-s3';
import {
  Input,
  Button,
  Box,
  TextField,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import TagIcon from '@mui/icons-material/Tag';
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
    headline = 'Edit photo 📸';
    photoId = location.state?.id;
    image = location.state?.img;
    tempImgUrl = location.state?.img;
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
  const [isLoading, setIsLoading] = useState(false);
  /// START - tensorflow
  const [model, setModel] = useState();
  const [tfClasses, setTfClasses] = useState([]);

  async function loadModel() {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log('set loaded Model');
    } catch (err) {
      console.log(err);
      console.log('failed load model');
    }
  }

  useEffect(() => {
    setIsLoading(true);
    tf.ready().then(() => {
      loadModel().then(() => setIsLoading(false));
    });
  }, []);

  async function handlePredict() {
    const predictions = await model.detect(document.getElementById('tfImg'));
    setTfClasses(predictions.filter((el) => el.score >= 0.8));
  }

  const handleAddSuggestion = (tag) => {
    setFormState({ ...formState, tags: formState.tags + `#${tag}` });
    const newTf = tfClasses.filter((el) => el.class !== tag);
    setTfClasses(newTf);
  };
  const suggestions = tfClasses.map((el) => (
    <span onClick={() => handleAddSuggestion(el.class)}>#{el.class}</span>
  ));

  // END- TENSORFLOW

  const userId =
    localStorage.getItem('userId') !== null
      ? localStorage.getItem('userId')
      : '12';
  async function onImageChange(e) {
    setFormState({
      ...formState,
      image: e.target.files[0],
      tempImgUrl: URL.createObjectURL(e.target.files[0]),
    });
  }

  function handleSubmit() {
    const postUrl = `/api/${userId}`;
    setIsLoading(true);
    S3FileUpload.uploadFile(formState.image, config)
      .then((data) => {
        setFormState({ ...formState, s3Url: data.location });
        console.log(data);
        return data;
      })
      .then((data) =>
        fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            comments: formState.desc,
            url: data.location,
            tags: formState.tags,
            takenAt: formState.date,
          }),
        })
      )
      .then((res) => {
        setIsLoading(false);
        navigate('/dashboard');
      })
      .catch((err) => alert(err));
  }
  function handleEdit() {
    const patchUrl = `/api/${userId}/photos?photoId=${photoId}`;
    // if image has been updated
    if (formState.tempImgUrl !== formState.s3Url) {
      setIsLoading(true);
      S3FileUpload.uploadFile(formState.image, config)
        .then((data) => {
          setFormState({ ...formState, s3Url: data.location });
          console.log(data);
          return data;
        })
        .then((data) =>
          fetch(patchUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              comments: formState.desc,
              url: data.location,
              tags: formState.tags,
              takenAt: formState.date,
            }),
          })
        )
        .then((res) => {
          setIsLoading(false);
          navigate('/dashboard');
        });
    } else {
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
      {isLoading && (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
          <CircularProgress color='grey' />
        </Box>
      )}
      <Paper sx={{ p: 5 }} elevation={3}>
        <Typography variant='h6' mb={5}>
          {headline}
        </Typography>
        {formState.tempImgUrl && (
          <Box className='addPhoto'>
            <img
              style={{ maxWidth: '300px' }}
              src={formState.tempImgUrl}
              id='tfImg'
            />

            <Box
              component='div'
              sx={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <Button
                onClick={() =>
                  setFormState({ ...formState, image: null, tempImgUrl: '' })
                }
              >
                Remove
              </Button>
              <Button
                onClick={handlePredict}
                endIcon={<TagIcon />}
                variant='outlined'
              >
                Generate tags
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
        {tfClasses.length > 0 && <Typography>Add: {suggestions} </Typography>}
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
