import S3FileUpload from 'react-s3';

const config = {
    bucketName: '1PadBucket',
    region: 'us-east-1',
    accessKeyId: 'AKIA5UXFKCNE25GGXBRI',
    secretAccessKey: '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',
    s3Url: 'http://1pad.s3-website-us-east-1.amazonaws.com'
}

const upload = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
    .then(data => console.log(data))
    .catch(err => alert(err));
}

const uploadComponent = (props) => {
    return (
        <>
            <h3>Upload Images</h3>
            <input type="file" onChange={upload}></input>
        </>
    )
};

export default uploadComponent;
