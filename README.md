# DAYTRIPPER
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


## About

DayTripper is a travel website where users can search and upload itineraries for their favourite destinations. Each itinerary is for one day only (e.g. 24 hours in Milan) with recommendations for what to see and do (including where to eat and how to get around). The itineraries are tried and tested by fellow travellers (unlike AI-generated ideas) and can include local knowledge, anecdotes, and tips for those who like to stray off the beaten track.

It’s a useful tool for planning trips to places you haven’t been before and can also serve as inspiration. Limiting itineraries to one day keeps things simple so you don’t have to search through too much information. Anyone can browse the itineraries but you have to create an account (with the option to add a profile photo) in order to save and comment on itineraries you’ve tried. Signed-in users can also create, edit or delete their own itineraries (you can upload up to 3 images for each itinerary). You can view a list of your own itineraries and any itineraries you’ve saved on your profile page. 

### Brief


This was my second project on the GA Software Engineering Bootcamp. Our brief was to build a Node/Express/MongoDB application with full CRUD that met the following criteria: 

MVP

	•	The app utilizes EJS Templates for rendering views to users.
	•	The app uses session-based authentication.
	•	The app’s files are organized following the conventions taught in lectures.
	•	The app has at least one data entity in addition to the User model. At least one entity must have a relationship with the User model.
	•	The app has full CRUD functionality.
	•	Authorization is implemented in the app. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
	•	The app is deployed online so that the rest of the world can use it.



## Getting Started

After the initial setup (Express, Mongoose, EJS), you'll need to install the following packages: 

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

For HTTP requests: 

```bash
npm install morgan
```

```bash
npm install method-override
```


## Planning 


