# Falconer


**Setup up a webapp with nodejs and angularjs. (http://nodejs.org/, https://angularjs.org/ )**

1. Follow the http://nodejs.org/ document and quick start

2. Check the nodejs as web server which is the best practice

3. Follow the express document(http://expressjs.com/)

4. Install angularjs from https://angularjs.org/


**Use Less for all css rules ( http://lesscss.org/)**

1. Install less(http://lesscss.org/)

2. I use bootstrap, so my less code is less


**Create CRUD REST endpoints for providing json blobs above**

1. Search the nodejs restful api which is the best practice

2. Coding publishing rest api at /routes/api.js

3. Api list:/api/publishing(post,get), /api/publishing/:id(get,put,delete)


**Render the publishing item and enable the ui to create, update and delete items (no validation)**

1. Only modify some fields when update and create publishing

2. After create publishing, the server use socket to communicate with the client

3. Update and deletion will be operated by front-end and backend at the same time


**Make a websocket impl. and when a new publication is created it pushes the data to the ui in real time.**

1. Search the nodejs socket(http://socket.io/)


**Make a graph page with a graph rendering the data in the reach graph (using d3.js)**

1. Search the angularjs and d3.js, got the solution(https://github.com/angularjs-nvd3-directives/angularjs-nvd3-directives)

2. I change the reach data schema to match the nvd3Chart data source

3. I could not understand the reach data timestamp. Why several values were showed at the same time. I change the timestamp to index to show in the graph


**Make a websocket impl. and add data points to the reach graph in real time**

1. Every 5 seconds the server send 10 messages by socket

2. I didn't add more data to the reach graph


**Enable the project to be run from “node app.js” on localhost:3000**

1. git clone https://github.com/zdlm/Falconer

2. npm install

3. node app.js


--------------------------------------