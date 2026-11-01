const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath;

    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'index.html');
            break;
        case '/about':
            filePath = path.join(__dirname, 'about.html');
            break;
        case '/contact-me':
            filePath = path.join(__dirname, 'contact-me.html');
            break;
        default:
            filePath = path.join(__dirname, '404.html');
            res.statusCode = 404;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(res.statusCode, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});