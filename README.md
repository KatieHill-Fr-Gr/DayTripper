# DAYTRIPPER
by Katie Hill


## Tech stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
     alt="JavaScript" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" 
     alt="Mongoose" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" 
     alt="Express" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" 
     alt="Node js" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg" 
     alt="MongoDB" width="40" height="40"/>


## About

DayTripper is a travel website where users can search and upload itineraries for their favourite destinations. Each itinerary is for one day only (e.g. 24 hours in Milan) with recommendations for what to see and do (including where to eat and how to get around). The itineraries are tried-and-tested by fellow travellers (unlike AI-generated ideas) and can include local knowledge, anecdotes, and destinations that are off the beaten track. 

It’s a useful tool for planning trips to places you haven’t been before or just for inspiration on where to travel next. It keeps things simple by limiting itineraries to one day so users don’t have to search through loads of information. Users will also be able to save multiple itineraries for the same destination (if available) to build a complete itinerary for their trip. Users also can upload a profile photo, comment on itineraries they’ve tried, and edit or delete their own itineraries.


* Browse a list of itineraries (organised by location on the index page)
* View a list of most popular itineraries on the site (listed on the home page?)
* Sign up to create their own account (including photo upload)
* Sign in
* Create their own itinerary and add it to the site (including photo upload)
* Edit their own itineraries
* Delete their own itineraries
* Check a list of their own itineraries on their profile page
* Like/save other itineraries (which adds them to their profile page under “favourites”)
* Unlike/unsave other itineraries
* Comment on any itinerary (to add recommendations or give feedback)


### Brief


For this project, you’ll build a Node/Express/MongoDB application with full CRUD. You get to decide what you want to build as long as it meets the technical requirements outlined below.

MVP

	•	The app utilizes EJS Templates for rendering views to users.
	•	The app uses session-based authentication.
	•	The app’s files are organized following the conventions taught in lectures.
	•	The app has at least one data entity in addition to the User model. At least one entity must have a relationship with the User model.
	•	The app has full CRUD functionality.
	•	Authorization is implemented in the app. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
	•	The app is deployed online so that the rest of the world can use it.





## Getting Started

After the initial setup (Express, Mongoose, EJS), install the following packages: 

For user authentication: 

```bash
npm install bcrypt
```

```bash
npm install express-session
```

```bash
npm install connect-mongo
```


For handling image uploads (cloud storage):

```bash
npm install cloudinary
```

```bash
npm install multer
```

```bash
npm install streamifier
```

```bash
npm install streamify
```

For HTTP requests: 

```bash
npm install morgan
```

```bash
npm install method-override
```




## Planning 

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" 
     alt="Figma" width="40" height="40"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg" 
     alt="Asana" width="100" height="100"/>

I used Asana to plan this project (5 days to build, 2 days for UAT/additional features).

![Figma Design](https://res.cloudinary.com/dh0z1a9nd/image/upload/v1757593538/DayTripper_Planning_nt2swt.png)

I created the UI design in Figma (including all the main pages, fonts, colour scheme, and images): 

![Figma Design](https://res.cloudinary.com/dh0z1a9nd/image/upload/v1757586531/DayTripper_project2_iwddk3.png)
![Figma Design](https://res.cloudinary.com/dh0z1a9nd/image/upload/v1757586968/DayTripper_project2_2_xtjkap.png)



## Build



### Challenges



