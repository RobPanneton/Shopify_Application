# Shopify_Application

# Tech used

- React.js
- Material-UI
- styled-components

# Extra Features

- Dropdown for selecting engine
- Loader spinner renders while the response is being fetched
- Error handling for when the request fails
- Stop user from sending empty input

# Instructions for running the app

## Make sure node.js is installed on your machine, it could be installed via this [link](https://nodejs.org/en/download/) .

## ======= From the terminal in the root directory of this folder =======

## Move to the app's directory from the root folder

### `cd app`

## Install the dependencies while in the app folder

### `npm install`

## Before running, add the .env file with the api key in the app folder

## Run this command in windows shell, git bash or any linux based terminal

### `echo "INSERT_KEY_HERE" > .env`

## Use npm to start the app from the app folder

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## In order to trigger the error handling code:

### In ./app/src/context/AppContext.js , make any modification to the Authorization string value on line 66 to make the api return an error.

## You could also visit the hosted version by clicking on this link [https://rob-panneton-shopify-application.netlify.app/](https://rob-panneton-shopify-application.netlify.app/)
