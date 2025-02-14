// Thomas McLaughlin
// This code will process the HTTP requests.

import { IncomingMessage, ServerResponse } from "http";
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    res.end("Hello World");
};