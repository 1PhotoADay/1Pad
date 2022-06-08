import React from 'react';
import { Link } from 'react-router-dom';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

function SearchBox({ images, handleError }) {
  return (
    <ImageList>
      {images.map((photo) => (
        <Link
          to='/photos'
          state={{ ...photo, img: photo.url, date: photo.takenat }}
        >
          <ImageListItem key={photo.id}>
            <img
              src={`${photo.url}?w=248&fit=crop&auto=format`}
              loading='lazy'
              onError={() => handleError(photo.id)}
            />
            <ImageListItemBar title={photo.takenat} subtitle={photo.tags} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}

export default SearchBox;
