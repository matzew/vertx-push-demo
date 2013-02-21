/**
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
load('vertx.js')

var server = vertx.createHttpServer()

// global ev...
var eb = vertx.eventBus;


// Inspired from Sinatra / Express
var rm = new vertx.RouteMatcher();
// Extract the params from the uri
rm.get('/details/:user/:id', function(req) {
  req.response.end("User: " + req.params()['user'] + " ID: " + req.params()['id'])
  
  // Publish to the Event bus....
  var json = {text: "New Item (ID:" + req.params()['id'] + ") created!"};
  console.log("Queued message...");
  eb.publish("org.aerogear.messaging", json);
  
});

// Catch all - serve the index page
rm.getWithRegEx('.*', function(req) {
  //if (req.uri == "/rest") req.response.sendFile("route_match/index.html")
  if (req.uri == "/msg") req.response.sendFile("www/index.html")
  else {
	  // meh...
	  req.response.sendFile('www/' + req.path); 
  } 
});

// 'deploy:
server.requestHandler(rm);


// Create a SockJS bridge which lets everything through (be careful!)
vertx.createSockJSServer(server).bridge({prefix: "/eventbus"}, [{}], [{}]);

server.listen(8080, '0.0.0.0');