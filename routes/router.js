const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ranjangupta:hanuman12@bionic.sx9eb.mongodb.net/users?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
module.exports = () => {
  router.use(bodyParser.urlencoded());
  router.get('/', (request, response) => {
    return response.render('index', { pagetitle: 'new Title' });
  });
  router.get('/index2', (request, response) => {
    return response.render('index2', { pagetitle: 'new Title' });
  });
  router.get('/index4', async (request, response) => {
    response.render('index4', { "result": await aa(2) })
  });
  router.get('/index5', (request, response) => {
    return response.render('index5', { pagetitle: 'new Title' });
  });
  router.post('/update', async (request, response) => {
    await aa(request.body);
    response.render('index3', { pagetitle: 'new Title' });
  });
  router.post('/delete', async (request, response) => {
    response.render('index4', { "result": await ab(1, request.body) });
  });
  router.post('/search', async (request, response) => {
    response.render('index4', { "result": await ab(3, request.body) });
  });

  async function ab(y, x) {
    let db;
    try {
      const returnable = [];
      db = await MongoClient.connect(url, { useUnifiedTopology: true });
      const dbo = await db.db("users");
      if (y == 1) {
        await dbo.collection("feedback").deleteOne({ "email": x.email });
        return aa(2);
      }
      else {
        const found = await dbo.collection("feedback").find({ name: { $regex: x.search, $options: "$i" } });
        await found.forEach(eachtest => { returnable.push(eachtest) });
        let temp=returnable;
        const fond = await dbo.collection("feedback").find({ email: { $regex: x.search, $options: "$i" } });
        let flag;
        await fond.forEach(eachtest => {
          flag=0;
          for (let j = 0; j < temp.length; j++) {
            if (eachtest.sn === temp[j].sn){
              flag=1;
              break;
            }
          }
          if(flag!=1) returnable.push(eachtest);
        });
        const fod = await dbo.collection("feedback").find({ mobile: { $regex: x.search, $options: "$i" } });
        let fag;
        await fod.forEach(eachtest => {
          flg=0;
          for (let k = 0; k < temp.length; k++) {
            if (eachtest.sn === temp[k].sn){
              fag=1;
              break;
            }
          }
          if(fag!=1) returnable.push(eachtest);
        });
        return returnable;
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (db) db.close();
    }
  }
  async function aa(x) {
    let db;
    try {
      const returnable = [];
      db = await MongoClient.connect(url, { useUnifiedTopology: true });
      const dbo = await db.db("users");
      const found = await dbo.collection("feedback").find({});
      await found.forEach(eachtest => { returnable.push(eachtest) });
      if (x == 2) return returnable;
      else {
        x.sn = returnable.length + 1;
        await dbo.collection("feedback").insertOne(x);
        return;
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (db) db.close();
    }
  }
  return router;
}