var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
    routePath(req,res);
});

server.listen(9090);
var port = process.argv[2] || 9090;
site = 'http://localhost:' + port;

function routePath(req,res){
    var pathObj = url.parse(req.url,true);

    switch(pathObj.pathname){
        case "/getWeather":
        var ret;
        if(pathObj.query.city == "beijing"){
            ret = {
                "city": "beijing",
                "weather": "sunny"
            }
        }else{
            ret = {
                "city": pathObj.query.city,
                "weather": "Unknow"
            }
        }
        res.end(JSON.stringify(ret));
        break;
        default:
        staticRoot(req,res);
    }

}

function staticRoot(req,res){
    var pathObj = url.parse(req.url,true);

    var filePath = path.join(__dirname,pathObj.pathname);

    if(fs.existsSync(filePath)){
        var pathnameDir = fs.lstatSync(filePath);
        if(pathnameDir.isDirectory()){
            filePath = path.join(filePath,"index.html");
        }
    }

    fs.readFile(filePath,"binary",function(error,fileContent){
        if(error){
            res.writeHead(404,"not found");
            res.write("<h1>404 Not Found</h1>");
            res.end();
        }else{
            res.writeHead(200,"OK");
            res.write(fileContent,"binary");
            res.end();
        }
    });
}

console.log('Static file server running at\n => ' + site + '/\nCTRL + C to shutdown');