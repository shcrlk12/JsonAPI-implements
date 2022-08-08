//express 모듈 불러오기
const express = require('express');
const mysql = require('mysql');
const jsonapi = require('./model/jsonapi.js');
const dbMgr = require('./db/dbMgr.js');

//express 사용
const app = express();

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

jsonapi.ok('1', 'articles');

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/articles/1", (req, res) => {
    console.log(req.route.path.split('/'));
    jsonapi.ok('1', 'articles');
    //유저 정보 반환
    res.json(jsonapi);
});

app.listen(3000, () => console.log(""));

