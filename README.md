# DAYTRIPPER — A blogging app with a travel magazine-feel
by Katie Hill

<img width="1219" height="931" alt="DayTripper_live" src="https://github.com/user-attachments/assets/0d5e98a4-ecaa-4451-82f6-7415da9cea18" />


## Tech stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
     alt="JavaScript" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg" 
     alt="CSS3" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg" 
     alt="HTML" width="40" height="40"/>  

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" 
     alt="Mongoose" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" 
     alt="Express" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" 
     alt="Node js" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg" 
     alt="MongoDB" width="40" height="40"/>

## Timeframe

- **Duration** 5 days (4 days to build, 1 day to test)
- **Team** This was a solo project

## About

DayTripper is a blogging app where users can view and upload itineraries for their favourite destinations. Each itinerary is for one day only (e.g. 24 hours in Milan) with recommendations for what to see and do (including where to eat and how to get around). The itineraries are tried and tested by fellow travellers (unlike AI-generated ideas) and can include local knowledge, anecdotes, and tips for those who like to stray off the beaten track.

You can try it out here: https://daytripper-itinerary-planner.netlify.app/

### Brief


This was my second project on the General Assembly Software Engineering Bootcamp. Our brief was to build a MongoDB/Express/Node.js application with full CRUD functionality, EJS Templates, and session-based authentication. This felt like a great opportunity to build a blogging app to take advantage of MongoDB’s document-oriented data structure (which works well for this kind of content) and the possibility of handling real-time interactions with Node.js. 

I wanted to make the app as visually appealing as possible so I used apps like Instagram as inspiration to create a colourful UI/UX design as well as an image upload feature to allow users to add photos to their itineraries. I also added “Like” and “Comment” features which involved adding conditional rendering to the individual itineraries. It was tricky to integrate these features at first but the solutions I found work well and I was able to deliver a fully functional app by the deadline. 


## Installation

After the initial setup (Express, Mongoose, EJS), install the following packages to run the project locally: 

**User authentication**

```bash
npm install bcrypt
npm install express-session
npm install connect-mongo
```

**HTTP requests & middleware**

```bash
npm install morgan
npm install method-override
```


## Planning 

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" 
     alt="Figma" width="40" height="40"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg" 
     alt="Asana" width="100" height="100"/>

#### 1) Routing

Since the project required a RESTful API, I started by creating a routing chart to plan all the endpoints:

<img width="981" height="588" alt="DayTripper_RESTfulRouting" src="https://github.com/user-attachments/assets/1c7c5859-55bd-421a-a126-485af07f44e0" />

#### 2) Data Relationships

I then created an Entity Relationship Diagram (ERD) to help map out the relationships between the User model and other data entities: 

<img width="1399" height="543" alt="DayTripper_ERD" src="https://github.com/user-attachments/assets/98bdfe8b-e21f-4f58-ad3b-46896bfb62c8" />

#### 3) UI/UX Design

Using a basic template in Figma as a starting point, I designed the UI with consistent styling and travel-themed stock images: 

<img width="843" height="618" alt="DayTripper_project2" src="https://github.com/user-attachments/assets/f742926f-a70a-4ec0-97a5-afbbf52ff730" />

<img width="884" height="651" alt="DayTripper_project2_2" src="https://github.com/user-attachments/assets/aba14c9b-c625-47dc-b671-66b0d9f0f05a" />

Finally, I created a project board in Asana to plan and keep track of my tasks throughout the week. 


## Build


#### 1) Core Navigation & Layout

I created the main pages of the app using a flexbox layout to ensure a fully responsive design on mobile devices:

- Homepage
- Navigation bar
- Categories pages
- Custom 404 “Not found” page

#### 2) Itineraries

I implemented full CRUD operations for the itineraries along with a global CSS file for consistent form styling across the app: 

- Index (basic list view)
- Show (detail view)
- Create (new itinerary form)
- Update (edit itinerary form)


#### 3) User Authentication:

Once the basic app had been set up, I added a separate router for authentication (sign up, sign in, and sign out) and implemented checks to ensure that all required fields had been filled:

```
   try {
        const { username, password, confirmPassword } = req.body
        if (username.trim() === '') {
            throw new Error('Username is required')
        }
        if (password.trim() === '') {
            throw new Error('Password is required')
        }
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            throw new Error('Username already exists')
        }
        if (password !== confirmPassword) {
            throw new Error('Passwords must match')
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
```

I used bcrypt to hash the password on sign up and compare passwords when the user signs in. I also implemented session-based authentication, saving the sessions to MongoDB and passing the user to the views using custom middleware: 

<img width="630" height="347" alt="DayTripper_sessionauthentication" src="https://github.com/user-attachments/assets/8db344ed-39c2-4b36-a5ba-9875fab985cd" />

<img width="658" height="717" alt="DayTripper_usermiddleware" src="https://github.com/user-attachments/assets/883c0c22-4b4d-4b3d-8fa4-048f5260e5d2" />

I then developed the views:

- Sign-up page
- Login page
- Profile page (link conditionally rendered in navigation bar)


#### 4) Image Upload


To allow users to upload a profile picture and add images to their itineraries, I initially integrated the following third-party packages: 

- **Cloudinary** for image storage and delivery
- **Multer** middleware to handle file uploads
- **Streamifier** to covert the file buffer into a readable stream

<img width="646" height="676" alt="DayTripper_imageupload" src="https://github.com/user-attachments/assets/c600e6c2-a974-477c-b3f6-ba189d1ffcc1" />

With this setup, files were sent to Cloudinary via the backend (Node.js server). However, this was refactored later after deploying the app via Netlify (see *Challenges* below) to avoid server upload limits. 

I added the attributes `accept=“image/*”` and `multiple` to the file input fields in the EJS Templates to allow the user to upload any image type and choose multiple images (up to three) when creating an itinerary.


 #### 5) Comments & Likes 


I implemented new routes using POST and DELETE methods to allow users to like or unlike itineraries and post or delete comments. I used req.params to identify the individual itinerary, user, and comment. I also used the signedInUser middleware to ensure that only logged-in users could perform these actions, and also checked the session user ID against the author ID to authorise deletion. 

<img width="634" height="732" alt="DayTripper_Likes" src="https://github.com/user-attachments/assets/8c9dc41f-83a1-4000-b703-ddb087a37bb3" />


### Challenges


#### 1) Image file names

I wanted to display the file names in the form when the user uploaded their profile photo during sign up and when uploading photos to accompany each itinerary. I used the DOM to achieve this: 

<img width="589" height="376" alt="DayTripper_FileUpload" src="https://github.com/user-attachments/assets/5c9d16e1-1bfc-47fb-9a68-33c4e314bf97" />

#### 2) Image upload errors

After deployment, the app crashed when users tried to upload images that exceeded Netlify’s file size limit (Netlify terminates the connection if the file size exceeds 100 MB for single files and 6 MB for payloads). 

To fix this, I refactored the code to bypass the server and upload images directly from the browser to the Cloudinary API (which has a more generous file size limit). I replaced the existing helper functions (cloudinary.js and cloudinaryUpload.js) with two new functions and added this script to the HTML head to handle the direct uploads: 

<img width="638" height="975" alt="DayTripper_cloudinaryjs" src="https://github.com/user-attachments/assets/90414ffa-f495-42fe-803b-a96e5960fd6e" />


I then refactored the EJS forms (to create and edit itineraries and user profiles) as well as the controller routes so that the files could be uploaded to Cloudinary and sent to the server via hidden input.


This approach simplified the codebase (no need for server-side middleware like multer or streamifier anymore) and ensured a more user-friendly experience. 






#### 3) Conditional rendering 

When working on the "save" and "comment" features, I also had to find a solution for how to display these on the page (or display nothing if no one had commented or saved that particular itinerary), and allow the user to unsave the itinerary or delete their own comments: 

<img width="586" height="224" alt="DayTripper_UserInteractions" src="https://github.com/user-attachments/assets/81a10242-c2aa-4c0b-8193-34a1b2e819f9" />

I used optional chaining (e.g. req.session.user?._id) to track if the user was logged in or not. This meant I could then check if the logged-in user had saved the itinerary or posted any of the comments using userHasLiked and userHasCommented.   



### Wins

- Visually appealing UI/UX design inspired by travel magazine websites
- Context-aware navigation, dynamically rendering different features based on the user’s authentication status
- Community interaction through “Comments” and “Likes” to encourage user engagement


## Key Learnings

This project helped me gain a thorough understanding of the MEN stack and develop the practical skills needed to: 

- Design and implement RESTful APIs using Express.js and Node.js
- Use EJS Templates (with scriptlets and client-side script to render dynamic pages)
- Implement session-based user authentication with cookies
- integrate an external database (MongoDB) and manage CRUD operations
- Model data relationships using references and/or embedded schemas

I also became more comfortable with refactoring code and adapting my solutions when faced with new challenges or unexpected bugs. 


## Future Improvements

- Public user profiles
- Private messaging feature
- Most popular posts
- Top contributors (showcase users who have posted the most or the most popular itineraries)
- Improved UX with:
	- additional user messaging and feedback
	- more responsive design on mobile with a hamburger menu
	- dark mode option




