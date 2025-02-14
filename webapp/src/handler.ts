// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.

import { IncomingMessage, ServerResponse } from "http";
import { readFile, readdir } from "fs";
// pulling readdir from fs module to get filenames

export const handler = (req: IncomingMessage, res:ServerResponse) => {
    //readFile reads contents of data.json
    readFile("data.json", (err: Error | null, data: Buffer) => {
        if (err == null) {
            res.end(data, () => console.log("Filesent"));
            // callback here logs FileSent after sending data to screen
        }
        else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};