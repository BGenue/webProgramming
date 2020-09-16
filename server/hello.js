//모듈 import
var http = require("http");
var fs = require('fs');
var url = require('url');

//서버 생성
var app = http.createServer(function(request, response){
  /*
    http 헤더 전송
    status 200 - ok
    content type - text/plain
  */
  //response.writeHead(200, {'Content-Type' : 'text/plain'});

  /*
    response body 를 변경
  */
  //response.end("Hello World!!\n");

  //생활코딩
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  console.log(title);
  if(_url == '/')
  {
    title = "welcome";
  }
  if(_url == '/favicon.ico')
  {
    console.log("favicon 없엉");
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
  var template = `
  <html>
    <head>
      <meta charset="utf-8">
      <title>맥도날드 - ${title}</title>
      <link rel="stylesheet" href="./macdonald.css">
    </head>
    <body>
      <img src="./mc.jpg" alt="맥도날드 사진">
      <a href="/">home</a>
      <h3><a href="https://ko.wikipedia.org/wiki/%EB%A7%A5%EB%8F%84%EB%82%A0%EB%93%9C">맥도날드</a></h3>
      <p id="main-content" class="box">
        <a href="/?id=mcdonald">맥도날드</a>(영어: McDonald's)는 <a href="/?id=america">미합중국</a>에 본거지를 둔 햄버거 체인점이다.<br/>
        McDonald's는 '맥도널드네' 혹은 '맥도널드의'라는 뜻으로, '맥도널즈'라고 쓰는 것이 외래어 표기법상 맞지만, 대한민국 법인이 '맥도날드'로 상표를 등록함에 따라 대한민국에서는 '맥도날드'로 표기한다.<br/>
        또한 맥도날드는 하루에 약 5,400만명의 고객이 찾고 있는 세계에서 가장 널리 알려진 체인 음식점이며, 햄버거 체인점으로는 가장 규모가 크다.<br/>
        맥도날드는 주로 햄버거, 치킨류, 아침 메뉴, 디저트류 등을 팔고 있다.<br/>
        최근의 웰빙 경향을 반영해 샐러드, 과일 제품을 팔고 있기도 하다.<br/>
        맥도날드를 세운 레이 크록의 천재성은 많은 사람들이 빠른 음식 서비스, 저렴한 가격, 맛좋은 음식, 그리고 음식맛의 일관성을 원한다는 것을 알아차린 데에 있다.<br/>
        맥도날드가 이러한 모습으로 나타나기 이전까지는 아무도 그러한 요소들을 제공하지 못했다.<br/>
        1955년에 맥도날드를 창업한 레이 크록(Ray Kroc)은 맛이 좋고 서비스도 빠르면서 저렴한 음식에 대한 소비 요구를 재빨리 간파했다.<br/>
        맥도날드가 세상에 나오기 전까지 어느 누구도 맛과 품질을 표준화시켜 공산품처럼 음식을 찍어내겠다는 발상을 하지 못했다.<br/>
        이를 실현하는 데 포장은 중요한 역할을 담당했다.<br/>
        세계 여러 나라에 맥도날드 체인점이 있기에 물가를 비교하기 위해 맥도날드 햄버거를 기준으로 한 물가 지수를 빅맥 지수라고 할만큼 세계에 널리 퍼져 있다.
      </p>
      <hr/>
      <p id="temp">임시 p 태그입니다.</p>
      <div id="menu" class="box">
        <h4>최애 메뉴</h4>
        <ul>
          <li>트리플 치즈 버거</li>
          <li>베이컨 빅맥 버거</li>
          <li>상하이 스파이시 버거</li>
          <li>스낵랩</li>
        </ul>
      </div>
    </body>
  </html>
  `;
  //response.end(fs.readFileSync(__dirname + "/frontend" + _url));\
  response.end(template);
});
app.listen(3000);

console.log("Server running at http://127.0.0.1:3000");
