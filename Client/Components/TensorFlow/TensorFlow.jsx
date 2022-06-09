import React, { useEffect, useState, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

const [model, setModel] = useState();

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
  tf.ready().then(() => {
    loadModel();
  });
}, []);

const predictions = await model.detect(document.getElementById('tfImg'));

console.log(predictions);
