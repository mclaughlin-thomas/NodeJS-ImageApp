"use strict";
// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs_1 = require("fs");
const handler = (req, res) => {
    (0, fs_1.readFile)("data.json", (err, data) => {
        if (err == null) {
            res.end(data, () => console.log("Filesent"));
        }
        else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};
exports.handler = handler;
