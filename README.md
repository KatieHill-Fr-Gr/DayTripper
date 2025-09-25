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

**Image uploads (cloud storage)**

```bash
npm install cloudinary
npm install multer
npm install streamifier
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

Since the project required a RESTful API, I started by creating a routing chart to plan all the endpoints:

<img width="981" height="588" alt="DayTripper_RESTfulRouting" src="https://github.com/user-attachments/assets/1c7c5859-55bd-421a-a126-485af07f44e0" />

I then created an Entity Relationship Diagram (ERD) to help map out the relationships between the User model and other data entities: 

<img width="1399" height="543" alt="DayTripper_ERD" src="https://github.com/user-attachments/assets/98bdfe8b-e21f-4f58-ad3b-46896bfb62c8" />

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

Once the basic app had been set up, I added a separate router for authentication (sign up, sign in, and sign out) and implemented checks to ensure that all required fields had been filled in along with custom error messages:

<img width="640" height="356" alt="DayTripper_createaccount" src="https://github.com/user-attachments/assets/44b110c3-0882-49bc-8caa-cc248589171f" />


I used bcrypt to hash the password on sign up and compare passwords when the user signs in. I also implemented session-based authentication, saving the sessions to MongoDB and passing the user to the views using custom middleware: 

<img width="630" height="347" alt="DayTripper_sessionauthentication" src="https://github.com/user-attachments/assets/8db344ed-39c2-4b36-a5ba-9875fab985cd" />

<img width="658" height="717" alt="DayTripper_usermiddleware" src="https://github.com/user-attachments/assets/c6a0a385-8179-46f0-8f23-03f7ad84fff0" />

I then developed the views:

- Sign-up page
- Login page
- Profile page (link conditionally rendered in navigation bar)


#### 4) Image Upload






 #### 5) Comments & Likes 






### Challenges


#### 1) Image file names

I wanted to display the file names in the form when the user uploaded their profile photo during sign up and when uploading photos to accompany each itinerary. I used the DOM to achieve this: 

<img width="589" height="376" alt="DayTripper_FileUpload" src="https://github.com/user-attachments/assets/5c9d16e1-1bfc-47fb-9a68-33c4e314bf97" />

I also limited the combined size of the files to 6 MB and added checks directly to the CREATE route (which throw errors if more than 3 files are uploaded or if the total upload exceeds 6 MB): 

<img width="1920" height="1080" alt="DayTripper_FileSizeLimit" src="https://github.com/user-attachments/assets/13200a58-f55d-4cac-ac2e-0654c745e8c3" />


#### 2) Image upload errors




#### 3) Conditional rendering 

When working on the "save" and "comment" features, I also had to find a solution for how to display these on the page (or display nothing if no one had commented or saved that particular itinerary), and allow the user to unsave the itinerary or delete their own comments: 

<img width="586" height="224" alt="DayTripper_UserInteractions" src="https://github.com/user-attachments/assets/81a10242-c2aa-4c0b-8193-34a1b2e819f9" />

I used optional chaining (e.g. req.session.user?._id) to track if the user was logged in or not. This meant I could then check if the logged-in user had saved the itinerary or posted any of the comments using userHasLiked and userHasCommented.   



### Wins

* Visually appealing UI/UX design inspired by travel magazines
* intuitive navigation with the different features rendered based on the user’s logged status
* Comments create a social / community aspect


## Key Learnings

Overall, this project went really well. I spent a lot of time planning the relationships, functionalities, and overall layout, which meant that the build was relatively straightforward. It was particularly helpful having the relationships mapped out before I started to code. This meant that there was less to fix during UAT (I asked around five people to test the app). 


## Future Improvements

The user profile is only visible to the user at the moment. As this is a social media app and intended to build a community, it would be better to have public profiles, too. I’d also like to display the most popular posts and give users bronze, silver or gold traveller status based on how many itineraries they have posted or how popular their itineraries are. 



