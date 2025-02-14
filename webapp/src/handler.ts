// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.

import { IncomingMessage, ServerResponse } from "http";
const fs= require('fs');
const path= require('path');

export const handler = (req: IncomingMessage, res:ServerResponse) => {
    
    if(req.url?.startsWith('/images/')){
        const imagePath= path.join(__dirname, req.url); // appending
        console.log(imagePath); // For debugging
        console.log(req.url); // For debugging
        fs.readFile(imagePath, (error: any, data: any)=>{
            // console.log(typeof data);
            if (error){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Image not found.');
                return;
            }
            res.writeHead(200, {'Content-Type': 'image/jpeg'}); // all images are jpeg
            res.end(data);
        });
        return;
    }

    fs.readFile('dist/index.html', function(error: any, data: Buffer){
        // console.log(typeof data); Documentation says this should be a buffer but says it is an object

        if(error){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Error!');
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data); // writes content of index.html
        res.end(); // finalizes response and sends to the user
        
    });

    //readFile reads contents of data.json
    // fs.readFile("data.json", (err: Error | null, data: Buffer) => {
    //     if (err == null) {
    //         res.end(data, () => console.log("Filesent"));
    //         // callback here logs FileSent after sending data to screen
    //     }
    //     else {
    //         console.log(`Error: ${err.message}`);
    //         res.statusCode = 500;
    //         res.end();
    //     }
    // });
};
