// Thomas McLaughlin
// This creates a simple HTTP server that listens for
// HTTP requests on port 8000, and processes them using
// the function defined in the handler.ts file.

import { createServer } from "http";
import { handler } from "./handler";

const port = 8000;

const server = createServer(handler);
// Callback fcn passed to the createServer function
// handler will be invoked when Node.js receives an HTTP connection

server.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});