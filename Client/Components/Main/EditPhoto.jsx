import React from 'react';
import { useLocation } from 'react-router-dom';

function EditPhoto() {
  const location = useLocation();
  const { img, id } = location.state;
  return (
    <div>
      <img src={img} />
    </div>
  );
}

export default EditPhoto;
