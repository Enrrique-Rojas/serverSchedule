const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const schedule = require('node-schedule');
const axios = require('axios');
app.use('*', cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const someDate = new Date(req.body.date)
    const data = {
        'tipoUsuario':req.body.tipoUsuario,
        'package':req.body.package,
        'mensaje':req.body.mensaje,
        'enviadoPor':req.body.enviadoPor,
        'idUsuario':req.body.idUsuario,
        'idSala':req.body.idSala,
    };
    schedule.scheduleJob(someDate,()=>{
        console.log('IMPRIMIENDO METODO',req.body.date)
        axios.post("https://tuclinika.net/api/notificacionpush",data).then(res=>{
            console.log('STATUS CODE:',res.status)
            console.log('BODY:',res.data)
        }).catch(err=>{
            console.log(err)
        })
    })
    res.send("API is up.");
})

app.get('/', (req, res) =>{
    res.send("INICIO 2");
});

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log('API is running');
})
