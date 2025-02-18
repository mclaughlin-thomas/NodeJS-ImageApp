// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.

// This largely uses the same setup as seen in our book Mastering Node.js
// with some reference to outside resources to serve html and jpeg files.
// The book does a good job of explaining TypeScript and JavaScript topics,
// but from the sections read so far they did not cover how to handle
// requests for files.
// Aside from referencing our book I watched this tutorial on how to service files:
// https://www.youtube.com/watch?v=p5eCYKiZN-4&t=46s.
// As well as the video posted on schoology:
// https://www.youtube.com/watch?v=f2EqECiTBL8


import { IncomingMessage, ServerResponse } from "http";
import { endPromise, writePromise } from "./promises";


const fs= require('fs');
const path= require('path');

const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;

export const handler = async (req: IncomingMessage, res:ServerResponse) => {
    
    if(req.url?.startsWith('/images/')){
        // Our images have requests as well!
        // Every time the user hits next image, this will run.

        console.log(req.url); // For debugging. This is the vanilla url of the request, i.e., /images/auspicious.jpg
        const imagePath= path.join(__dirname, req.url); // appending
        console.log(imagePath); // For debugging. This is the entire path, /home/thomas/Documents/Node/ImageApp/webapp/dist/images/auspicious.jpg
        fs.readFile(imagePath, (error: any, data: any)=>{
            if (error){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not Found...');
                return;
            }
            // all images are jpeg
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // send image to user
        });
        return;
    }

    if(req.url?.endsWith('.js')){
        // Every time the user hits next image, a request for next.js is made.

        console.log(req.url); // For debugging. This is the vanilla url of the request, i.e., next.js
        const scriptPath= path.join(__dirname, req.url); // appending
        console.log(scriptPath); // For debugging. This is the entire path, /home/thomas/Documents/Node/ImageApp/webapp/dist/next.js
        fs.readFile(scriptPath, (error: any, data: any)=>{
            if (error){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('File not Found...');
                return;
            }
            
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(data); // send javascript
        });
        return;
    }

    if(req.url?.endsWith('/block')){
        // Every time the user hits next image, a request for next.js is made.

        console.log("Starting count!"); // For debugging. This is the vanilla url of the request, i.e., next.js
        const request = shared_counter++;
        for (let iter = 0; iter < iterations; iter++) {
            for (let count = 0; count < total; count++) {
                count++;
            }
            const msg = `Request: ${request}, Iteration: ${(iter)}`;
            console.log(msg);
            await writePromise.bind(res)(msg + "\n");
        }
        await endPromise.bind(res)("Done");
        return;
    }
    
    fs.readFile('dist/index.html', function(error: any, data: Buffer){
        // Using dist/index.html because this logic ran from dist directory where JavaScript files are
        console.log("Requesting HTML");
        if(error){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Error!');
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data); // writes content of index.html
        res.end(); // finalizes response and sends to the user
        
    });
};
