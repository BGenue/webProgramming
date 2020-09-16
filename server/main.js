var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function templateHtml(title, list, description) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>햄버거 - ${title}</title>
      <link rel="stylesheet" href="./mcdonald.css">
      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    </head>
    <body>
      <div class="focus"><a href="/">${title}</a></div>
      <img src="${title}.png" alt="햄버거 사진">
      <a href="/create">create</a>
      <div>
        <div class="unfocus" style="display:inline-block;"><a href="/?id=MCDONALD">맥도날드</a></div>
        <div class="unfocus" style="display:inline-block;"><a href="/?id=BURGERKING">버거킹</a></div>
        <div class="unfocus" style="display:inline-block;"><a href="/?id=MOMSTOUCH">맘스터치</a></div>
      </div>
      <p id="main-content" class="box">${description}</p>
      <hr/>
      <div id="menu" class="box">
        <h4>햄버거 브랜드</h4>
        ${list}
      </div>
    </body>
  </html>
  `;
}

var app = http.createServer(function(request, response) {
  var ip_addr = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  console.log("누구야 : " + ip_addr);

  var _url = request.url;
  console.log("url : " + _url);
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  console.log("title : ", title);
  if (_url == "/facicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }

  console.log("pathname : " + pathname);
  if (pathname === '/')
  {
    if (queryData.id === undefined) {
      title = "HAMBURGER";
    }
    fs.readdir('./data', function(err, filelist) {
      var list = '<ul>';
      var i = 0;
      while (i < filelist.length) {
        if (filelist[i] !== "HAMBURGER") {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        }
        i += 1;
      }
      list = list + '</ul>';

      fs.readFile(`./data/${title}`, 'utf8', function(err, description) {
        var template = templateHtml(title, list, description);
        response.writeHead(200);
        response.end(template);
      });
    });
  }
  else if (pathname === "/create")
  {
    if (queryData.id === undefined) {
      title = "HAMBURGER";
    }
    fs.readdir('./data', function(err, filelist) {
      var list = '<ul>';
      var i = 0;
      while (i < filelist.length) {
        if (filelist[i] !== "HAMBURGER") {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        }
        i += 1;
      }
      list = list + '</ul>';
      description = `
      <form action="http://localhost:3000/create_process" method="post">
        <div><input type="text" name="title" placeholder="title"></div>
        <div><textarea name="description" placeholder="description"></textarea></div>
        <div><input type="submit"></div>
      </form>`
      var template = templateHtml(title, list, description);
      response.writeHead(200);
      response.end(template);
    });
  }
  else if (pathname === "/create_process")
  {
    var body = '';
    request.on('data', function(data){
      body += data;
      //너무 많을 때
      if(body.length > 1e6){
        request.connection.destroy();
      }
    });
    request.on('end', function(){
      var post = qs.parse(body);
      console.log(post);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        console.log("파일 저장 완료!!");
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end('success');
      });
    });
  }
  else if(pathname === "/mcdonald.css")
  {
    fs.readFile('mcdonald.css', function(err, data){
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(data);
      response.end();
    });
  }
  else if(pathname.slice(-4,) === '.png')
  {
    fs.readFile(pathname.slice(1, -4).toLowerCase() + '.png', function(err, data){
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.write(data);
      response.end();
    });
  }
  else
  {
    response.writeHead(404);
    response.end("Not Found");
    console.log("Not Found");
  }
  //response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
