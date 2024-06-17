# Cloud Snap

Cloud Snap is a React Native application built with Expo and Firebase. It allows users to capture, upload, and retrieve images and videos from AWS S3 storage. This repository contains the complete source code for the Cloud Snap app.

## Features

- Capture images and videos
- Upload media to AWS S3
- Retrieve and display user-specific media
- Authentication with Firebase
- Smooth and responsive UI

## Tech Stack

- **Expo**
- **React Native**
- **Firebase**
- **AWS S3**
- **EAS (Expo Application Services)**

## Installation

To set up the repository and run the application locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kishankool/CloudSnap.git
    cd CloudSnap

    ```

2.  **Install dependencies:**

    ```bash
    npm install

    ```

3.  Setup Firebase:

    Create a Firebase project at Firebase Console.
    Add an Android and/or iOS app to your Firebase project.
    Download the google-services.json (for Android) and GoogleService-Info.plist (for iOS) and place them in the appropriate directories.
    Alternatively, you can use the google-services.json file provided in the code.

4.  Set up the Backend API:

        Clone the backend repository:

        ```
        git clone https://github.com/kishankool/backend_gallery_app.git
        cd backend_gallery_app
        ```

        Follow the instructions in the backend repository to set it up and start the server.

        Update the API base URL in the Cloud Snap app:

        Open src/utils/API.js and replace the mediaAPIString with your own server address:

        ```
        export const mediaAPIString = `https://your-ngrok-url/api/media`;
        ```

5.  Run the development client:

        You can download the pre-built development client from this link or build your own using the provided scripts.

        To start the app:
        ```
        npm run dev-client

        ```

        To build the development client:

        ```
        npm run build-apk

        ```

    Available Scripts
    In the project directory, you can run:

    npm start: Starts the Expo project.
    npm run android: Starts the Expo project for Android.
    npm run ios: Starts the Expo project for iOS.
    npm run web: Starts the Expo project for the web.
    npm run dev-client: Starts the project with the development client.
    npm run build-apk: Builds the development client APK.
    License
    This project is licensed under the MIT License. See the LICENSE file for details.

    For any questions or issues, please open an issue on GitHub or contact me at kishanworks007@gmail.com.

    Happy coding!
