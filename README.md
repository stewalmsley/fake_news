# fake_news

This project is a React front end for a fake news social network, building on a backend api which I set up using Express and Mongoose - https://github.com/stewalmsley/fake_news_back_end.

The front end is deployed on netlify - https://ncfakenews.netlify.com/ while the backend is deployed on Heroku (https://steve-news.herokuapp.com/).
For example - https://steve-news.herokuapp.com/api/articles is the api endpoint for GET requests for all articles from the backend - these are displayed on the homepage of the front end at https://ncfakenews.netlify.com/

The front end is tested with integration tests using Cypress as well as unit testing of the data handling funtionality. Although styling and responsiveness have not been prioritised, the Axe extension in Chrome has been used to increase accessibility. 

The site loads with a random user selected and logged in - displayed with an avatar in the top right. Click 'Log In / Switch User' to enter one of the users' loginnames or select a user from a dropdown. The identity of the logged in user affects the functionality - users can delete only their own articles and comments, and can vote on only other users' articles/comments.
When you select a new user to log in, you will see 'Welcome back.. (username)' and be navigated back to the home page.
The logged in user is then saved to local storage and logged in next time you load the site.

The site allows you to
- Browse all articles - with comment and vote counts, and links to the author's profile.
- Filter articles by any string
- See (on the sidebar) a menu of the most active topics and users, sorted by the number of articles, comments or votes, and click through to a menu of all topics and users
- View articles by topic
- View a particular user with the articles and comments they have made
- Sort articles/comments by different criteria (date of creation, number of votes/comments)
- Click into a detailed view of an article with comments
- Create an article
- Comment/vote and delete depending on the identity of the logged in user as explained above.

You can clone this project from github into a folder and run NPM install to set up dependencies - react, react-dom, react-scripts, axios (to make api requests), reach-router (for component links and navigation), and dayjs (to convert dates into a more readable format).

The project can be run locally with Node using the Start script defined in the Package JSON:
```http   
npm start
```
There is a unit testing file in the test folder which checks the functionality in the utils folder - used to manipulate and sort the data returned from the api. 
```http   
npm test 
```

Cypress integration tests check the key functionality of the app - the ability to log in and create articles, vote (on other users' content), view articles/comments by topic and user. 

```http   
npm run cypress:open
```
Make sure to npm start the project from a different terminal window before trying to open the Cypress tests. 

Author:
Steve Walmsley - learning Javascript at NorthCoders