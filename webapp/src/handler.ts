// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created usint the ServerResponse object.

import { IncomingMessage, ServerResponse } from "http";
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    res.end("Hello World");
};