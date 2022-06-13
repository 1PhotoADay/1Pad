# About 1Pad
1Pad is short for **1P**hoto **A** **D**ay. The app is designed provide a personal space where users can upload 1 photo a day, as the name suggests- a photo that highlights their day. The dashboard displays a calendar of the past 30 days along with their associated photos. In order to access the dashboard, the user must create and log onto their account. From the dashboard, the user can upload, edit, delete photos, write a brief description about the photo, and add hashtags to each entry. Once an image is selected, the user can use the auto tag generation feature to view and choose from suggested hashtags generated with Tensorflow.js and the COCO SSD objection detection model. In addition, the user can search photos by hashtag.

1Pad is optimized for mobile view.   

# Screenshots
### Landing page
![Screen-Shot-2022-06-10-at-2-58-18-PM.png](https://i.postimg.cc/V61GYPbd/Screen-Shot-2022-06-10-at-2-58-18-PM.png)

### Dashboard
![Dashboard.gif](https://i.postimg.cc/j5r28ZnH/Dashboard.gif)

### Upload photo
![uploadPhoto.gif](https://i.ibb.co/fDK6xmb/Coffee-short.gif)

### Delete photo
![Delete.gif](https://i.postimg.cc/FHrHJY5Z/Delete.gif)

### Search photo by tag
![Search-Dog.gif](https://i.postimg.cc/T3svY1Rh/Search-Dog.gif)]

### Logout
![logout.gif](https://i.postimg.cc/VkZmr4Ff/logout.gif)


# Built With
- [React.js](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- [Node.js](https://nodejs.org/en/)
- [Tensorflow.js](https://www.npmjs.com/package/@tensorflow/tfjs)
- [Jest](https://jestjs.io/)
- [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
- [AWS S3](https://aws.amazon.com/s3/)

# Getting Started
To get a local copy up and running follow these simple steps.
1. Clone the repo
```
  git clone https://github.com/1PhotoADay/1Pad
```
2. Install NPM packages
```
  npm install
```
3. Create a .env file in the root directory and paste in the following
``` 
  PG_URI=YOUR POSTGRESQL URL
```
4. In the Client/utils directory/config.js, enter your own S3 config object
``` javascript
const S3config = {
  bucketName: '1pad',
  region: 'YOUR AWS S3 REGION',
  accessKeyId: 'YOUR ACCESS KEY ID',
  secretAccessKey: 'YOUR SECRET ACCESS KEY',
  s3Url: 'YOUR S3 URL',
};

export default S3config;
```
5. In the terminal, run `npm run dev` and go to http://localhost:8080 to access the application
