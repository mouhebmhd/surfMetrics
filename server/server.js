const express = require('express');
var cors=require('cors')
const app = express();
app.use(express.json());
app.use(cors())
const dotenv=require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cookieParser=require("cookie-parser");
const path = require('path');
const jwt=require("jsonwebtoken");
const controller=require('./controller/controller')
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });



var connectDB=require("./database/conenctionDB");
const { json } = require('body-parser');
dotenv.config( { path : 'config.env'} );
app.use(express.json({ limit: '500000mb' }));
app.use(bodyparser.urlencoded({ limit: '500000mb', extended: true, parameterLimit: 50000000000000 }));
app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended : true}));
const PORTPrimary=process.env.PORTPrimary;
const PORTSecondary=process.env.PORTSecondary;
app.use(cookieParser());
app.use('/', require('./routes/router'))
app.listen(PORTPrimary || PORTSecondary, ()=> { console.log(`Server is running on http://localhost:${PORTPrimary||PORTSecondary}`)});
connectDB(); 

server.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('message', (data) => {
      // Handle incoming data here
      controller.addSessionEvents(JSON.parse(data).evenements,JSON.parse(data).id)
    });
    
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });
