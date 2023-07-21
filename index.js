import express from 'express';
import jwt from 'jsonwebtoken';//jwt - любое название, те я его сам придумал
import mongoose from 'mongoose';
import mysql from 'mysql2';


const DB_NAME = "users";
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: 'blog_app',
  password: "4$9~mMpfemrPBwtX"
});

connection.connect(function(err){
    if(err){
      if (err.message.includes("Unknown database")) {//если ошибка, то создаем таблицу заново
        let name = "CREATE DATABASE "+DB_NAME;
        console.log(name);
        connection.query(name,
        function(err, results) {
          if(err) console.log(err);
          else console.log("DB is created");
      });
     }
      else{
        console.log(err);
      };
    }
    else{
      console.log("DB OK");
    }
 });

const app = express();

app.use(express.json()) // штука которая подключает json в наше экспресс приложение

app.get('/', (req,res) => { // возвращение двух параметров req,res по пути /
    res.send('Hello world!');
});

app.post('/auth/login',(req,res) =>{
    console.log(req.body);

    const token = jwt.sign(
        {
            email: req.body.email,
            fullName: req.body.fullName,
        },
        'secret123',//ключ для шифрование, конечно потом переделать
    );


    res.json({
        haha: true,
        token,
    });

});

app.listen(4444, (err)=>{//порт
    if(err)
    {
        return console.log(err);

    }
    console.log('Server OK');
});

