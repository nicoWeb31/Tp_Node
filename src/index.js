import express from "express";
import routes from './route';
import bodyParser from "body-parser" ;

const morgan =require("morgan");
const app = express() ;
const port = 3000;
const twig = require("twig");


app.use(morgan("dev"));
app.use(bodyParser. json({})); 
app.set('view engine' , 'twig');
app.use("/", routes({ }));
app.listen(port, () => console. log(`Example app listening on port ${port}!`));


app.use((err, req,res, next) => { console. error(err.stack) ; res.status(500).send('on a un probléme'); });
app.use((req, res) => {res.status(404).send("Ooops, you took a wrong turn !" ) });