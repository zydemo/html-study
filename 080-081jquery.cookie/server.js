//引入模块
let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');

//引入自定义方法
let mimeModel = require('./model/getmime-all')

var port = process.argv[2] || 8002;
site = 'http://localhost:' + port;

//创建服务 访问 http://localhost:8002/
http.createServer((req,res)=>{
    //获取请求文件名 如 index.html
    let pathName = url.parse(req.url,true).pathname;
    console.log(req.url);

    if(pathName == '/'){
        pathName = '/index.html'
    }
    //获取请求文件的后缀名 如.html
    let extName = path.extname(pathName);

    if(pathName != '/favicon.ico'){//过滤favicon请求
        console.log(pathName);

        //读取请求的静态文件 如index.html
        fs.readFile('static'+pathName,(err,data) => {
            if(err){//读取失败 返回404.html
                console.log('404');

				fs.readFile('static/404.html',function(error,data404){
					if(error){
						console.log(error);
					}else{
                        res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                        res.write(data404);
                        res.end(); /*结束响应*/
                    }
				})
            }else{
                let mime = mimeModel.getMime(fs,extName);//获取文件类型
                res.writeHead(200,{'Content-Type':""+mime+";charset=utf-8"})
                res.write(data)//返回请求文件内容
                res.end();
            }
        })
    }
}).listen(8002)

console.log('Static file server running at\n => ' + site + '/\nCTRL + C to shutdown');