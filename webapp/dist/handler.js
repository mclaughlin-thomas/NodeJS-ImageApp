"use strict";
// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
const fs = require('fs');
const path = require('path');
const blockTotal = 2000000000;
const blockIterations = 10;
let block_shared_counter = 0;
const betterTotal = 2000000000;
const betterIterations = 10;
let better_shared_counter = 0;
const handler = async (req, res) => {
    if (req.url?.startsWith('/images/')) {
        // Our images have requests as well!
        // Every time the user hits next image, this will run.
        //console.log(req.url); // For debugging. This is the vanilla url of the request, i.e., /images/auspicious.jpg
        const imagePath = path.join(__dirname, req.url); // appending
        console.log(imagePath); // For debugging. This is the entire path, /home/thomas/Documents/Node/ImageApp/webapp/dist/images/auspicious.jpg
        fs.readFile(imagePath, (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found...');
                return;
            }
            // all images are jpeg
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data); // send image to user
        });
        return;
    }
    if (req.url?.endsWith('.js')) {
        // Every time the user hits next image, a request for next.js is made.
        //console.log(req.url); // For debugging. This is the vanilla url of the request, i.e., next.js
        const scriptPath = path.join(__dirname, req.url); // appending
        console.log(scriptPath); // For debugging. This is the entire path, /home/thomas/Documents/Node/ImageApp/webapp/dist/next.js
        fs.readFile(scriptPath, (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not Found...');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data); // send javascript
        });
        return;
    }
    if (req.url?.endsWith('/block')) {
        // Every time the user hits next image, a request for next.js is made.
        console.log("Starting count block!"); // For debugging. This is the vanilla url of the request, i.e., next.js
        const request = block_shared_counter++;
        for (let iter = 0; iter < blockIterations; iter++) {
            for (let count = 0; count < blockTotal; count++) {
                count++;
            }
            const msg = `Request: ${request}, Iteration: ${(iter)}`;
            console.log(msg);
            await promises_1.writePromise.bind(res)(msg + "\n");
        }
        await promises_1.endPromise.bind(res)("Done");
        return;
    }
    if (req.url?.endsWith('/better')) {
        console.log("Starting count better!"); // For debugging. This is the vanilla url of the request, i.e., next.js
        const request = better_shared_counter++;
        const iterate = async (iter = 0) => {
            if (iter > 0) {
                await new Promise((resolve) => setImmediate(resolve));
            }
            for (let count = 0; count < betterTotal; count++) {
                count++;
            }
            const msg = `Request: ${request}, Iteration: ${(iter)}`;
            console.log(msg);
            await promises_1.writePromise.bind(res)(msg + "\n");
            if (iter == betterIterations - 1) {
                await promises_1.endPromise.bind(res)("Done");
            }
            else {
                setImmediate(() => iterate(++iter));
            }
        };
        iterate();
        return;
    }
    fs.readFile('dist/index.html', function (error, data) {
        // Using dist/index.html because this logic ran from dist directory where JavaScript files are
        console.log("Requesting HTML");
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Error!');
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data); // writes content of index.html
        res.end(); // finalizes response and sends to the user
    });
};
exports.handler = handler;
