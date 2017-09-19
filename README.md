# Task
1)	Create some simple markup (of course use routing for the pages, we create SPA)
 a.	Authorization
 b.	Main page
 c.	About author
2)	Draw simple map with point of your geolocation
3)	Implement zoom in/out buttons on a map
4)	Click on a map has to create a marker
5)	Implement save and show buttons – save button saves all the created markers, show button – shows it
6)	When clicking on the save button   marker should be sent to the server
 a.	Create a back-end (node.js + express + mongodb)
 b.	Create  a user api
 c.	Create an api to save location array
 d.	Create a GET request to fetch all saving markers
 e.	Authorization (Basic auth)
7)	Create list with type of objects to be chosen (pharmacies, gas stations, schools,  restaurants) so click on the list item has to draw markers on the map).

# Start application
1. Start MongoDB on localhost. Run `C:\Program Files\MongoDB\Server\3.4\bin>mongod.exe --dbpath c:\data\db`.
2. Clone or download https://github.com/AleksandrKu/map-nodejs . Install a package `npm install`. Run `npm start`. Http server run on port 8000. 
3. Clone or download this repository. Install a package `npm install`. Run `npm start`. Navigate to 'http://localhost:4200/'.


