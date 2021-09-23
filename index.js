const express=require('express');

const path=require('path');

const server=express();
const router=require('./routes/router');
const port=7000;

server.set('view engine', 'ejs');
server.set('views',path.join(__dirname,'./'));

    
server.use(express.static(path.join(__dirname,'./')));
console.log(__dirname)

server.use('/',router());

server.listen(process.env.PORT || 5000,()=>{
    console.log('server has started');
})
