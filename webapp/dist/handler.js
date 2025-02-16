"use strict";
// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs = require('fs');
const path = require('path');
const handler = (req, res) => {
    if (req.url?.startsWith('/images/')) {
        // Our images have requests as well!
        // Every time the user hits next image, this will run.
        console.log(req.url); // For debugging. This is the vanilla url of the request, i.e., /images/auspicious.jpg
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
    fs.readFile('dist/index.html', function (error, data) {
        // Using dist/index.html because this logic ran from dist directory
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
