const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      user : 'postgres', //add your user name for the database here
      port: 5432, // add your port number here
      password : 'SQLconnect', //add your correct password in here
      database : 'smart-brain' //add your database name you created here
    }
});

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) =>{
    res.send("Success")
})
server.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
server.post('/signin', (req, res)=> signin.handleSignin(req, res, db, bcrypt));
server.get('/profile/:id', (req, res)=> profile.handleProfile(req, res, db));
server.post('/imageurl', (req, res)=> image.handleClarifyAPICall(req,res));
server.put('/image', (req, res) => image.handleImage(req, res, db));

server.listen(3000);