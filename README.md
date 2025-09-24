# DAYTRIPPER — A social media app with a travel magazine-feel
by Katie Hill


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

DayTripper is a blogging app where users can search and upload itineraries for their favourite destinations. Each itinerary is for one day only (e.g. 24 hours in Milan) with recommendations for what to see and do (including where to eat and how to get around). The itineraries are tried and tested by fellow travellers (unlike AI-generated ideas) and can include local knowledge, anecdotes, and tips for those who like to stray off the beaten track.

You can try it out here: https://daytripper-itinerary-planner.netlify.app/

### Brief


This was my second project on the General Assembly Software Engineering Bootcamp. Our brief was to build a MongoDB/Express/Node.js application with full CRUD functionality, EJS Templates, and session-based authentication. This felt like a great opportunity to build a blogging app to take advantage of MongoDB’s document-oriented data structure (which works well for this kind of content) and the possibility of handling real-time interactions with Node.js. 

I wanted to make the app as visually appealing as possible so I used apps like Instagram as inspiration to create a colourful UI/UX design as well as an image upload feature to allow users to add photos to their itineraries. I also added “Like” and “Comment” features which involved adding conditional rendering to the individual itineraries. It was tricky to integrate these features at first but the solutions I found work well and I was able to deliver a full functional app by the deadline. 


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

First, I wrote the user stories to help me get an idea of the different functionalities the app would need: 

	1	Users want a landing page that explains what the site is for and directs them to the itineraries (the main resource)
	2	Users want to be able to view different itineraries (the itineraries should be listed on an index page and potentially under headings for each geographical region of specific destination)
	3	Users want to be able to create an account on the site so that they can save itineraries, comment on them, and also upload their own. 
	4	They also want to be able to edit or delete their own itineraries and comments, and unsave itineraries.
	5	Users want a profile page (clearly accessible from the nav bar) where they can see all their own itineraries as well as their saved ones.
	6	They want to be able to easily sign out and sign in again (also from the nav bar).

Next, I created an Entity Relationship Diagram (ERD) to help map out the relationships and a RESTful routing chart for my itineraries: 


<img width="1399" height="543" alt="DayTripper_ERD" src="https://github.com/user-attachments/assets/98bdfe8b-e21f-4f58-ad3b-46896bfb62c8" />
<img width="981" height="588" alt="DayTripper_RESTfulRouting" src="https://github.com/user-attachments/assets/1c7c5859-55bd-421a-a126-485af07f44e0" />


Based on the user stories and routing chart, I then designed the UI in Figma (including the home page and category pages, fonts, colour scheme, and images): 

<img width="843" height="618" alt="DayTripper_project2" src="https://github.com/user-attachments/assets/f742926f-a70a-4ec0-97a5-afbbf52ff730" />

<img width="884" height="651" alt="DayTripper_project2_2" src="https://github.com/user-attachments/assets/aba14c9b-c625-47dc-b671-66b0d9f0f05a" />


Finally, I used the project management tool Asana to plan out my tasks for the week:

<img width="1601" height="831" alt="DayTripper Planning" src="https://github.com/user-attachments/assets/461de585-d30d-445f-95f6-9079f76c49a1" />

## Build

The app took five days to build, with two days left at the end for UAT and my “stretch goals”, which included the comments and image upload features. I started by creating the homepage and main style sheet, then worked on the routes for the itineraries. I then added user authentication, custom error-handling, and the user's profile (with conditional rendering in the navigation bar depending on whether the user was logged in or not). 


### Challenges

There were some specific challenges in relation to the image upload and comments features. I wanted to display the file names in the form when the user uploaded their profile photo during sign up and when uploading photos to accompany each itinerary. I used the DOM to achieve this: 

<img width="589" height="376" alt="DayTripper_FileUpload" src="https://github.com/user-attachments/assets/5c9d16e1-1bfc-47fb-9a68-33c4e314bf97" />

I also limited the combined size of the files to 6 MB and added checks directly to the CREATE route (which throw errors if more than 3 files are uploaded or if the total upload exceeds 6 MB): 

<img width="1920" height="1080" alt="DayTripper_FileSizeLimit" src="https://github.com/user-attachments/assets/13200a58-f55d-4cac-ac2e-0654c745e8c3" />

When working on the "save" and "comment" features, I also had to find a solution for how to display these on the page (or display nothing if no one had commented or saved that particular itinerary), and allow the user to unsave the itinerary or delete their own comments: 

<img width="586" height="224" alt="DayTripper_UserInteractions" src="https://github.com/user-attachments/assets/81a10242-c2aa-4c0b-8193-34a1b2e819f9" />

I used optional chaining (e.g. req.session.user?._id) to track if the user was logged in or not. This meant I could then check if the logged-in user had saved the itinerary or posted any of the comments using userHasLiked and userHasCommented.   

## Key Learnings

Overall, this project went really well. I spent a lot of time planning the relationships, functionalities, and overall layout, which meant that the build was relatively straightforward. It was particularly helpful having the relationships mapped out before I started to code. This meant that there was less to fix during UAT (I asked around five people to test the app). 


## Future Improvements

The user profile is only visible to the user at the moment. As this is a social media app and intended to build a community, it would be better to have public profiles, too. I’d also like to display the most popular posts and give users bronze, silver or gold traveller status based on how many itineraries they have posted or how popular their itineraries are. 



