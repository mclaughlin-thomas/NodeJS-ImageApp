"use strict";
// Thomas McLaughlin
// This creates a simple HTTP server that listens for
// HTTP requests on port 8000, and processes them using
// the function defined in the handler.ts file.
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const handler_1 = require("./handler");
const port = 8000;
const server = (0, http_1.createServer)(handler_1.handler);
server.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
