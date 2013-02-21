vertx-push-demo
===============

To start the server , simple run the following command:

```
vertx run server.js
```

The server is binding to all interfaces, on your computer/server (0.0.0.0).

Now... point a client to http://SERVER:8080/msg - a jqm page will show up...


To issue a REST call do something like:

```
curl http://SERVER:8080/details/jeff/242
```

Now the jqm clients should receive messages...

