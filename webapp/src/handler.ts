// Thomas McLaughlin
// This code will process the HTTP requests.
// HTTP requests are represented by Incoming Message object.
// HTTP responses are created using the ServerResponse object.




import { IncomingMessage, ServerResponse } from "http";
const fs= require('fs');
const path= require('path');

export const handler = (req: IncomingMessage, res:ServerResponse) => {
    
    if(req.url?.startsWith('/images/')){
        console.log(req.url); // For debugging. This is the vanilla url of the request, i.e., /images/auspicious.jpg
        const imagePath= path.join(__dirname, req.url); // appending
        console.log(imagePath); // For debugging. This is the entire path, /home/thomas/Documents/Node/ImageApp/webapp/dist/images/auspicious.jpg
        fs.readFile(imagePath, (error: any, data: any)=>{
            if (error){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Image not found!');
                return;
            }
            // all images are jpeg
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // send image to user
        });
        return;
    }

    fs.readFile('dist/index.html', function(error: any, data: Buffer){

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
