import S3FileUpload from 'react-s3';

const config = {
  bucketName: '1pad',
  region: 'us-east-1',
  accessKeyId: 'AKIA5UXFKCNEUU7BP77B',
  secretAccessKey: `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`,
  s3Url: 'http://1pad.s3-website-us-east-1.amazonaws.com',
};

const upload = (img) => {
  S3FileUpload.uploadFile(img, config)
    .then((data) => console.log(data))
    .catch((err) => alert(err));
};

// const uploadComponent = (props) => {
//   return (
//     <>
//       <h3>Upload Images</h3>
//       <input type='file' onChange={upload}></input>
//     </>
//   );
// };

export default config;
