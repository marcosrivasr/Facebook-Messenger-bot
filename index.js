const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());

app.post('/webhook', (req, res) =>{
    console.log('POST: webhook');

    const body = req.body;

    if(body.object === 'page'){
    
        body.entry.forEach(entry => {
            // se reciben y procesan los mensajes
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.status(200).send('EVENTO RECIBIDO');
    }else{
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) =>{
    console.log('GET: webhook');

    const VERIFY_TOKEN = 'stringUnicoParaTuAplicacion';

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            console.log('WEBHOOK VERIFICADO');
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
});

app.listen(3000, () =>{
    console.log('Servidor iniciado...');
});