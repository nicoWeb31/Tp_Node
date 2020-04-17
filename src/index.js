import express from "express";
import routes from './route';
import passport from "passport" ;
import expressSession from "express-session" ;
import MySQLStore from "express-mysql-session" ;
import passportInitialization from
"./passport" ;


import bodyParser from "body-parser" ;

const morgan =require("morgan");
const app = express() ;
const port = 3000;
app.use(expressSession({
    key: "authentication_cookie",
    secret: "ceciDoitResterSecret",
    store: new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exercice_node_js'}),
    resave: false,
    saveUninitialized: false
    }));


    passportInitialization();
    app.use(passport.initialize());
    app.use(passport.session());

const twig = require("twig");


app.use(morgan("dev"));
app.use(bodyParser. json({})); 
app.set('view engine' , 'twig');
app.use("/", routes({ }));
app.listen(port, () => console. log(`Example app listening on port ${port}!`));


app.use((err, req,res, next) => { console. error(err.stack) ; res.status(500).send('on a un probléme'); });
app.use((req, res) => {res.status(404).send("Ooops, you took a wrong turn !" ) });