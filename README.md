
#  Filmify (React Native app)
## Info
Filmify is an application for movie fans with personal profile, favorite films and movie searching and sharing. 

**Platforms:** Android & iOS.

App was build with **React Native**. Bootstrapped with [Expo](https://expo.io/).
Server was build with **Node.js**.
Movies API: [The Movie DB](https://www.themoviedb.org/).

**Setup**:
* [Front-side (React Native setup)](#front-side-setup)
* [Back-side (Node.js/Express setup)](#back-side-setup)
## Overview
> Screens made on iOS
### Authentication screens:![Auth screenshot](https://i.ibb.co/DQmrgZz/auth.png)
### Tab pages screens:![App screenshot](https://i.ibb.co/jV3wXrH/app-1.png)
## Front side setup
#### First usage:
```bash
git clone https://github.com/rostyslav-vasyliuk/filmify-react-native-app.git

cd filmify-react-native\(Client-side\)/

npm install

npm start
```
Then open app on your device or simulator. If you need some help with Expo workflow read [this](https://docs.expo.io/versions/latest/workflow/up-and-running/).

**Additional features:**

For Push Notifications on Android you should configure Firebase Cloud Messaging.
Step-by-step tutorial: [https://docs.expo.io/versions/latest/guides/using-fcm/](https://docs.expo.io/versions/latest/guides/using-fcm/)

For using bug report tool [Sentry](https://sentry.io) (tool which is recommended to use with Expo apps) go through this manual: [https://docs.expo.io/versions/latest/guides/using-sentry/](https://docs.expo.io/versions/latest/guides/using-sentry/)

## Back side setup 

> ***Note:*** *Server is deployed on Heroku with following URL: [https://filmify-app.herokuapp.com](https://filmify-app.herokuapp.com)*
> *If you don't want to configure it for any of your purposes just use this server on Heroku.*

To start work with your own server change file **base-url.js** on front-side to your own local IP address with port **3030** by default. *(example 192.168.1.103:3030)*.
#### First usage: 
```bash
cd filmify-node.js\(Server-side\)/

npm install

npm dev (for starting with nodemon)
or
npm start (regular start)
```

For correct work you should create ```.env``` file with enviroment variables.

*Example:*
```
API_KEY=<api key for TheMovieDB>
USER_EMAIL=<your mail for nodemailer>
USER_PASSWORD=<password for your mail>
JWT_KEY=<secret for coding of your JWT tokens>
DB_USER=<database user>
DB_PASSWORD=<database pasword>
DB_HOST=<database host>
```

>*[Here](https://developers.themoviedb.org/3/getting-started/introduction) you can register your own API key for TheMovieDB*
