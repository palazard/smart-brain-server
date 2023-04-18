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
      connection: process.env.DATABASE_URL,
      searchPath: ['knex', 'public'],
      host : process.env.DATABASE_HOST, //localhost
      user : process.env.DATABASE_USER, //add your user name for the database here
      port: process.env.DATABASE_PORT, // add your port number here
      password : process.env.DATABASE_PW, //add your correct password in here
      database : process.env.DATABASE_DB //add your database name you created here
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