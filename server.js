'use strict';
var Hapi=require('hapi');
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:5000,
    routes:{
        cors:true
    }
});
server.route({
    method:"GET",
    path:"/",
    handler:(request,reply)=>{
        return "Welcome to HAPI Server";
    }
})

server.route({
    method:"GET",
    path:"/api/login",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'practice'
              });
              connection.connect();
     
              connection.query(`SELECT username,password from login `, function (error,table, fields) {
                if (error) reject(error);
                resolve(table);
              });
               
              connection.end();
        })
        
    }
})

server.route({
    method:"POST",
    path:"/api/log",
    handler:(request,reply)=>{
        let value=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'practice'
              });
              connection.connect();
     
              connection.query(`SELECT username,password from login Where username='${value.username}'`, function (error,table, fields) {
                if (error) reject(error);
                resolve(table);
              });
               
              connection.end();
        })
        
    }
})

server.start();
    console.log("server is started");
