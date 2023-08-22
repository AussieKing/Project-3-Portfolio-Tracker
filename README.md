# Project-3-Portfolio-Tracker

## TECHNOLOGIES USED:
- React Router DOM
- Material UI as React Library (https://mui.com/)
- GoogleFonts (https://fonts.google.com/specimen/Inconsolata) - 300, 400, 800
- Unsplash (Banner image by Javier Miranda https://unsplash.com/photos/MrWOCGKFVDg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink )
- Coingecko API : (https://www.coingecko.com/en/api)
- Axios : to handle API requests (https://www.npmjs.com/package/axios)
- React Alice Carousel: npm i react-alice-carousel (https://www.npmjs.com/package/react-alice-carousel)

## DEPENDENCIES:
- React Router DOM
"npm i react-router-dom" ;

- Material UI and the Lab : 
"npm install @mui/material @emotion/react @emotion/styled && npm install @mui/lab @mui/material" - (https://mui.com/material-ui/getting-started/installation/)


# STEPS:

## STEP 1:
Create the boilerplate React app via
"npx create-react-app portfolio-tracker"

## STEP 2:
change name of public -> index.html to Crypto Kings

## STEP 3
delete boiler plate React App.js and preloaded styles in App.css and render basic Hello World

## STEP 4
Wrap App.js in BrowserRouter and import it.

## STEP 5 :
Create Components (Header), and Pages (CoinPage and HomePage);

## STEP 6 : 
setup Styles in MaterialUI (create classname, provide styles inside of it, create an object for classes, and provide it to the classname)

## STEP 7 :
Header (app bar) : style and render with select drop down component, and wrap the header in the ThemeProvider dark mode.

## STEP 8 :
Setup Context API (file in Pages) to set the state at the beginning. We'll use context API also in the Crypto Context.

## STEP 9 :
Import our State

## STEP 10 : 
Create Crypto context provider and wrap the whole app in in it, and make sure the state changes for all the currency toggling.

## STEP 11 :
Homepage bulding. divided in 2 parts : 
    1) BANNER:
        a. styling [x]
    <!-- TODO : import of image not working -->
        b. carousel []
        c. API [x]
        d. carousel [x]


    2) COINS PORTION
        a. Search bar [x]
        b. Coin Table []  , using Basic Table inMaterial Ui


## STEP 12 :
Carousel.
via `npm i react-alice-carousel`
import `import "react-alice-carousel/lib/alice-carousel.css";` in index.js;
















## APP MUST :
User React for front end - []
Use GraphQL with a Node.js and Express.js server - []
Use MongoDB and Mongoose ODm for Database - []
Use Queries and Mutations for CRUD - []
Be Deployed on Heroku - []
Include Authentication (JWT) - []

## ADD-ON :
Add STRIPE to take donations - []
