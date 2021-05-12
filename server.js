const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) =>{

    // if (req.url === '/'){
    //     fs.readFile(path.join(__dirname, 'Public', 'main.html'), (err, data)=>{
    //         if (err){
    //             throw err
    //         }
    //         res.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         })
    //         res.end(data)
    //     })
    // }else if (req.url === '/contact') {
    //     fs.readFile(path.join(__dirname, 'Public', 'contact.html'), (err, data)=>{
    //         if (err){
    //             throw err
    //         }
    //         res.writeHead(200, {
    //             'Content-Type': 'text/html'
    //         })
    //         res.end(data)
    //     })
    // }
    let filePath = path.join(__dirname, 'Public', req.url === '/'? 'main.html' : req.url);
    console.log(filePath)
    const ext = path.extname(filePath);
    let contentType = 'text/html'
    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }
    if(!ext){
        filePath+='.html';
    }
    fs.readFile(filePath , (err, content)=>{
        if (err){
            fs.readFile(path.join(__dirname, 'Public', 'error.html'), (err, data) =>{
                if(err){
                    res.writeHead(500);
                    res.end('Error')
                }else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end(data)
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.end(content)
        }
    })

})
const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>{
    console.log(`Server has been started on ${PORT}...`)
})