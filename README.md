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
- react google button : `npm i react-google-button` (https://www.npmjs.com/package/react-google-button)
- dotenv : `npm i dotenv` (https://www.npmjs.com/package/dotenv)
- graphql : `npm i graphql` (https://www.npmjs.com/package/graphql)
- apollo-server-express : `npm i apollo-server-express` (https://www.npmjs.com/package/apollo-server-express)
- mongoose : `npm i mongoose` (https://www.npmjs.com/package/mongoose)
- bcrypt : `npm i bcrypt` (https://www.npmjs.com/package/bcrypt)
- jsonwebtoken : `npm i jsonwebtoken` (https://www.npmjs.com/package/jsonwebtoken)


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
    0. Setup Firebase (and create .env file for API key) [x]
    a. styling [x]
    b. Login Page [x]
    c. Login Form [x]
    d. Login Mutation [x]
    e. Auth Context [x]
    f. Auth Provider [x]
    g. Login [x]
    h. Logout [x]
    i. Protected Route []

## STEP 15 :
Database Setup.
    a. MongoDB Atlas [x]
    b. Mongoose [x]
    c. Models [x]
    d. Connect to DB [x]
    e. Create User [x]
    f. Login User [x]
    g. Auth Middleware []
    h. Get User []
    i. Logout User []

## STEP 16 :
User Sidebar/Watchlist Page.
    a. styling (using Drawer from MUI) [x]
    b. Watchlist Page [x]
    c. Watchlist Table []
    d. Watchlist Query [x]
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
Be Deployed on Heroku - [x]
Include Authentication (JWT) - []

## ADD-ON :
Add STRIPE to take donations - []

## ISUES FACED:
- commentary : I was trying to leave as many comments as possible, but turns out that that can lead to a tonne of warnings. So I had to remove some of them. I'll try to add as many as possible.
- Heroku X Firebase authentication : I was trying to use Firebase for authentication on the deployed app, but it kept having errors. I had to include the .env file in the gitignore, and then I had to include the API key in the Heroku config vars. But it still didn't work. Turns out that you have to configure the Heroku app to use the .env file. Then, also add the deployed heroku app html as an authorized domain in the firebase console. Then it worked!

## LEARNINGS:
- Shortcuts : the RAFCE shortcut via the ES7 extension in VSCode creates the boilerplate for a functional component.
- Material UI : I learnt how to use Material UI, and how to use the basic table, and the select drop down component.
- CTRL + space : to see the options available for the component (and import automatically)
- use `git config --global alias.tree '! git ls-tree --full-name --name-only -t -r HEAD | sed -e "s/[^-][^\/]*\//   |/g" -e "s/|\([^ ]\)/|-- \1/"'` to see the tree structure of the project, and call it by `git tree`


## SCORE:

### Repository Quality: 10% [x]
- Repository has a unique name.
- Repository follows best practices for file structure and naming conventions.
- Repository follows best practices for class and id naming conventions, indentation, quality comments, etc.
- Repository contains multiple descriptive commit messages.
- Repository contains a high-quality README file with description, screenshot, and link to deployed application.

### Presentation: 10%  [x]
- Your group should present using Google Slides, Powerpoint, or a similar presentation software.
- Every group member should speak during the presentation.
- Your presentation should follow the Project Presentation TemplateLinks to an external site..

### Collaboration: 10%  [x]
T- here are no major disparities in the number of GitHub contributions between group members.
### Concept: 10%  [x]
- Application should be a unique and novel idea.
- Your group should clearly and concisely articulate your project idea.

### Technical Acceptance Criteria: 25%   []
- Satisfies the following code requirements:
- Application uses React for the front end.
- Application has a GraphQL API with a Node.js and Express.js server, and uses queries and mutations for retrieving, adding, updating, and deleting data.
- Application uses MongoDB and the Mongoose ODM for the database and protects sensitive API key information on the server.
- Application includes user authentication using JWT.

### Deployment: 20%  []
- Application deployed at live URL on Heroku and loads with no errors.
- Application GitHub URL submitted.

### Application Quality: 15%   []
- Application user experience is intuitive and easy to navigate.
- Application user interface style is clean and polished.
- Application is responsive.


# TO-DO's:
- Charts not working 
- Firebase API call not working in Heroku

