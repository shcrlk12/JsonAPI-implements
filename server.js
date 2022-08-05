//express 모듈 불러오기
const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'test'
  });

connection.connect();

  
connection.query('SELECT * FROM test123', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});
  
connection.end();

//express 사용
const app = express();

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

class JsonApi{
    constructor(){
    }

    set setData(value){
        this.data = value
    }

    set setErrors(value){
        this.errors = value
    }

    set setMeta(value){
        this.meta = value
    }

    set setJsonApi(value){
        this.jsonapi = value
    }

    set setLinks(value){
        this.links = value
    }

    set setIncluded(value){
        this.included = value
    }
}

class RelationshipsObject{
    constructor(id, type){
        this.id = id;
        this.type = type;
    }
}

class ResourceObject extends RelationshipsObject{
    constructor(id, type, attributes, relationships, links, meta){
        super(id, type);
        this.attributes = attributes;
        this.relationships = relationships;
        this.links = links;
        this.meta = meta;
    }
}



class Attributes{

}

class Links{
    constructor(self, related){
        this.self = self;
        this.related = related;
    }
}
//임시 데이터
const users = [
 { id: 1, name: "유저1" },
 { id: 2, name: "유저2" },
 { id: 3, name: "유저3" }
];

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/", (req, res) => {

    //Hello World 데이터 반환
    res.send("Hello World");
});

/**
 * @path {GET} http://localhost:3000/api/users
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/api/users", async (req, res) => {
    var test = new JsonApi()
    test.setData = new ResourceObject('3', 'test');

    //유저 정보 반환
    res.json(test);
})

app.listen(3000, () => console.log(""));