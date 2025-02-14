// Thomas McLaughlin

import { createServer } from "http";
import { handler } from "./handler";

const port = 5000;

const server = createServer(handler);
server.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});