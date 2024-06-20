# Image Sharing Social Media

A social network for sharing images


## Author
- [Minh Vu](https://github.com/Codebutproblem)

## Technologies Used

- React: Used for building the user interface. Relevant files include all `.jsx` files in the `frontend/src/` directory.
- Node.js: Used for the backend server. The main server file is `backend/server/server.js`.
- MySQL: The database used for this project. The configuration can be found in `backend/config/database.js`.
- Tailwind CSS: Used for styling the frontend. The configuration can be found in `frontend/tailwind.config.js`.

## Features

- Display all images and images by topic
- Display detailed image information
- Add, edit, delete and update images
- Comment on images
- Like and unlike images
- Follow and unfollow users
- Search for images and users
- Notification system for likes, comments, and follows
- Save and unsave images
- Manage saved image tables, and user accounts

## Getting Started

To run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/Codebutproblem/Image_Sharing.git`
2. Navigate to the project directory: `cd Image_Sharing`
3. Install the dependencies for the frontend: `cd frontend && npm install`
4. Install the dependencies for the backend: `cd ../backend && npm install`
5. Create a database on MySQL.
6. Create .env file in `frontend` folder. Add the following environment variables: 
    ```
    VITE_REACT_FIREBASE_API_KEY= 
    VITE_REACT_FIREBASE_AUTH_DOMAIN= 
    VITE_REACT_FIREBASE_PROJECT_ID= 
    VITE_REACT_FIREBASE_STORAGE_BUCKET=
    VITE_REACT_FIREBASE_MESSAGING_SENDER_ID= 
    VITE_REACT_FIREBASE_APP_ID= 
    VITE_REACT_FIREBASE_MESUREMENT_ID= 
    VITE_REACT_FIREBASE_IMAGES_FOLDER=
    VITE_REACT_API_DOMAIN=
    VITE_REACT_API_AUTH_DOMAIN=
    ```

7. Create .env file in `backend` folder. Add the following environment variables: 
    ```
    PORT= 
    AUTH_PORT= 
    DB_HOST= 
    DB_NAME= 
    DB_USER= 
    DB_PASSWORD= 
    ACCESS_TOKEN_SECRET= 
    REFRESH_TOKEN_SECRET= 
    EMAIL_USER= 
    EMAIL_PASS=
    ```
8. Start the frontend server: `npm run dev` (from the `frontend` directory)
9. Start the backend server: `npm start` (from the `backend` directory)
10. Open your browser and visit `http://localhost:5173` to access the application

Please make sure you have Node.js and MySQL installed on your machine before running the project.

## Demo

![pic1](/screenshots/pic1.png)

![pic2](/screenshots/pic2.png)

![pic3](/screenshots/pic3.png)

![pic4](/screenshots/pic4.png)

![pic5](/screenshots/pic5.png)

![pic6](/screenshots/pic6.png)

![pic7](/screenshots/pic7.png)

![pic8](/screenshots/pic8.png)

![pic9](/screenshots/pic9.png)

![pic10](/screenshots/pic10.png)

![pic11](/screenshots/pic11.png)

![pic12](/screenshots/pic12.png)

![pic13](/screenshots/pic13.png)

![pic14](/screenshots/pic14.png)







