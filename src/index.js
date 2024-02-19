const { MyRoom } = require("./rooms/MyRoom");

const express = require("express");
const http = require("http");
const core  = require("@colyseus/core");
const WebSocketTransport  = require("@colyseus/ws-transport");
const configRoutes = require('./routes');

const app = express();
configRoutes(app);
const server = http.createServer(app); // create the http server manually


const gameServer = new core.Server({
  transport: new WebSocketTransport.WebSocketTransport({
    server // provide the custom server for `WebSocketTransport`
  })
});
gameServer.define('my_room', MyRoom);
gameServer.listen(process.env.PORT || 3000)

/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Cloud
 *
 * If you're self-hosting (without Colyseus Cloud), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options
 */
// const { listen } = require("@colyseus/tools");

// // Import arena config
// const appConfig = require("./app.config");

// // Create and listen on 2567 (or PORT environment variable.)
// listen(appConfig);
