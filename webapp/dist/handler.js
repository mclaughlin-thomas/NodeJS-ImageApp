"use strict";
// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created usint the ServerResponse object.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (req, res) => {
    res.end("Hello World");
};
exports.handler = handler;
