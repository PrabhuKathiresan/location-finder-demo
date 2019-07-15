# location-finder-demo

## About

This is a demo application which marks locations on Google Map and helps us to search data within a Range, using NodeJs as Backend server and ReactJs as Frontend and MongoDb as Database.


## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
    ```
    cd path/to/location-finder-demo; npm install
    cd path/to/location-finder-demo/frontend/assets; npm install
    ```
3. Change the required config settings
    ```
    cd path/to/location-finder-demo/server/configuration
    ```
    you will find a file named *index.js* in which you need to replace almost all the settings with your configuration.
    ```
    cd path/to/location-finder-demo/frontend/assets/src
    ```
    you will find a file named *config.js* in which you need to provide your clientId (for Google), appId (for Facebook) for OAuth Login   and also provide google maps API.
4. Build our Frontend file, run
    ```
    npm run build-prod (For Production)
    npm run build-dev (For Development)
    ```
4. Once everything is setted up (make sure mongodb is running), run
    ```
    npm start
    ```

## Setting up data

To upload csv file, you can check the fields required from the sample places.csv file available in the repo.
