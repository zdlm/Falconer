# Falconer

--------------------------------------
Setup up a webapp with nodejs and angularjs. (http://nodejs.org/, https://angularjs.org/ )
1.follow the http://nodejs.org/ documents quick start
2.check the nodejs web server best practice
3.follow the express document http://expressjs.com/ start
4.install angularjs https://angularjs.org/

Use Less for all css rules ( http://lesscss.org/)
1.install less http://lesscss.org/

Create CRUD REST endpoints for providing json blobs above
1.search the nodejs restful api best practice
2.coding publishing rest api in /routes/api.js
3.api list are:/api/publishing(post,get), /api/publishing/:id(get,put,delete)

Render the publishing item and enable the ui to create, update and delete items (no validation)
1.only modify some fields for update and create
2.create call the socket
3.update and delete handled by front-end and backend

Make a websocket impl. and when a new publication is created it pushes the data to the ui in real time.
1.search the nodejs socket, and use http://socket.io/

Make a graph page with a graph rendering the data in the reach graph (using d3.js)
Make a websocket impl. and add data points to the reach graph in real time
Enable the project to be run from “node app.js” on localhost:3000

--------------------------------------