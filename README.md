# Project-3-Portfolio-Tracker

## TECHNOLOGIES USED:
- React JS  (https://reactjs.org/)
    - React Router DOM
- Chart JS (https://www.chartjs.org/)
- Material UI as React Library (https://mui.com/)
- GoogleFonts (https://fonts.google.com/specimen/Inconsolata) - 300, 400, 800
- Unsplash (Banner image by Javier Miranda https://unsplash.com/photos/MrWOCGKFVDg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink )
- Coingecko API : (https://www.coingecko.com/en/api)
- Axios : to handle API requests (https://www.npmjs.com/package/axios)
- React Alice Carousel: npm i react-alice-carousel (https://www.npmjs.com/package/react-alice-carousel)
- html-react-oarser : `npm i html-react-parser` (https://www.npmjs.com/package/html-react-parser)
- react-chartjs-2 : `npm i react-chartjs-2` (https://www.npmjs.com/package/react-chartjs-2)

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
    2) COINS PORTION:
        a. Search bar [x]
        b. Coin Table using Basic Table inMaterial Ui [x]
        c. API [x]
        d. Coin Table [x]
        e. Pagination , need to slice the returned results and create the state, and import it [x]

## STEP 12 :
Carousel.
via `npm i react-alice-carousel`
import `import "react-alice-carousel/lib/alice-carousel.css";` in index.js;

## STEP 13 :
Single Coin page.
    a. styling [x]
    b. API [x]
    c. Coin Page [x]
    d. Chart []
    e. Coin Data (rank, price, market cap) [x]
    f. Coin Description [x]
    g. Coin Links [x]
    h. Add to Watchlist []


## STEP 14 :
Login Page.
    a. styling []
    b. Login Page []
    c. Login Form []
    d. Login Mutation []
    e. Auth Context []
    f. Auth Provider []
    g. Login []
    h. Logout []
    i. Protected Route []

## STEP 15 :
Database Setup.
    a. MongoDB Atlas []
    b. Mongoose []
    c. Models []
    d. Connect to DB []
    e. Create User []
    f. Login User []
    g. Auth Middleware []
    h. Get User []
    i. Logout User []

## STEP 16 :
Watchlist Page.
    a. styling []
    b. Watchlist Page []
    c. Watchlist Table []
    d. Watchlist Query []
    e. Watchlist Mutation []
    f. Add to Watchlist []
    g. Remove from Watchlist []
    h. Insert comment []
    i. Delete comment []
    j. Update comment []
    k. Logout []

## APP MUST :
User React for front end - [x]
Use GraphQL with a Node.js and Express.js server - []
Use MongoDB and Mongoose ODm for Database - []
Use Queries and Mutations for CRUD - []
Be Deployed on Heroku - []
Include Authentication (JWT) - []

## ADD-ON :
Add STRIPE to take donations - []

## ISUES FACED:
- commentary : I was trying to leave as many comments as possible, but turns out that that can lead to a tonne of warnings. So I had to remove some of them. I'll try to add as many as possible.

## LEARNINGS:
- Shortcuts : the RAFCE shortcut via the ES7 extension in VSCode creates the boilerplate for a functional component.
- Material UI : I learnt how to use Material UI, and how to use the basic table, and the select drop down component.
- CTRL + space : to see the options available for the component (and import automatically)
- use `git config --global alias.tree '! git ls-tree --full-name --name-only -t -r HEAD | sed -e "s/[^-][^\/]*\//   |/g" -e "s/|\([^ ]\)/|-- \1/"'` to see the tree structure of the project, and call it by `git tree`