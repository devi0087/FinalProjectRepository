const  http = require("http");
const port = 1234;
const server = http.createServer( (req, res)=>{
    console.log(req.url);
    if(req.url == '/'){
// send an html file
res.setHeader('Content-type', 'text/html');
res.writeHead(200);
res.write('<!Doctype html><html><head><title><Hi</title></head>');
res.end ('<body>Booya</body></html>');

    }else if(req.url == '/api'){
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        let obj = {
            prop1:"Rashad",
            prop2:"Amber",
            prop3:"Steve"
        };
        let str = JSON.stringify( obj );
    }else{
        res.setHeader('Content-type', 'text/plain');
        res.writeHead(404);
        res.end('file Nooot found!');
    }
    

    // res.write('Hello');
    // res.end('\n');
})
server.listen(port, (err)=>{
    if (err){
        console.log('Bad things', err);
        return; //exit if it fails
    }
    console.log('Listening on port', port);
})
