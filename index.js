const express = require('express');
const app = express();
const schedule = require('node-schedule');
const axios = require('axios');
//const https = require('http');
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send({ estado: "INGRESE AL REQUEST");
});

app.post('/', (req, res) => {
    const datetime = new Date();
    var secondsDatetime = datetime.getSeconds();
    var seconds = secondsDatetime+5;
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
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    };
    axios.post("https://tuclinika.net/api/notificacionpush",data,{headers: headers}).then(res=>{
            console.log('STATUS CODE:',res.status);
            console.log('BODY:',res.data);
            return res.status(200).send({ estado: res.data});
        }).catch(err=>{
            return res.status(200).send({ estado: err});
        });
   
    /*const someDate = new Date(req.body.date)
    const data = {
        'tipoUsuario':req.body.tipoUsuario,
        'package':req.body.package,
        'mensaje':req.body.mensaje,
        'enviadoPor':req.body.enviadoPor,
        'idUsuario':req.body.idUsuario,
        'idSala':req.body.idSala,
    };
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    };
    schedule.scheduleJob(someDate,()=>{
        console.log('IMPRIMIENDO METODO');
        console.log(data);
        axios.post("https://tuclinika.net/api/notificacionpush",data,{headers: headers}).then(res=>{
            console.log('STATUS CODE:',res.status);
            console.log('BODY:',res.data);
            return res.status(200).send({ estado: res.data});
        }).catch(err=>{
            return res.status(200).send({ estado: err});
        });
    });
    //res.send(someDate.toISOString());
    return res.status(200).send({ estado: someDate.toISOString()});*/
})

const port = process.env.port || 9001;
app.listen(port, () => {
    console.log('API is running');
})
