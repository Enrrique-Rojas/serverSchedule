const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const schedule = require('node-schedule');
const axios = require('axios');
app.use('*', cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const datetime = new Date();
    var secondsDatetime = datetime.getSeconds();
    var seconds = secondsDatetime+15;
    const someDate = new Date(datetime.getFullYear(),datetime.getMonth(),datetime.getDate(),
    datetime.getHours(),datetime.getMinutes(),seconds);
    const data = {
        'tipoUsuario':'3',
        'package':'com.tuclinika.tuclinika',
        'mensaje':'MENSAJE VERCEL',
        'enviadoPor':'pro_5',
        'idUsuario':'user_30',
        'idSala':'1668772209423_user_30_pro_5',
    };
    schedule.scheduleJob(someDate,()=>{
        console.log('IMPRIMIENDO METODO',req.body.date)
        axios.post("https://tuclinika.net/api/notificacionpush",data).then(res=>{
            console.log('STATUS CODE:',res.status);
            console.log('BODY:',res.data);
        }).catch(err=>{
            console.log(err);
        })
    });
    res.send(someDate.toISOString());
})

/* app.get('/', (req, res) =>{
    const datetime = new Date();
    console.log(datetime.toISOString().slice(0,19));
    res.send(datetime);
}); */

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log('API is running');
})
