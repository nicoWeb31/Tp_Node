import express from "express";
import routes from './route';
import bodyParser from "body-parser" ;

const app = express() ;
const port = 3000;
app.use(bodyParser. json({})); 
app.set('view engine' , 'ejs');
app.use("/", routes({ }));
app.listen(port, () => console. log(`Example app listening on port ${port}!`));


app.use((err, req,res, next) => { console. error(err.stack) ; res.status(500).send('on a un probléme'); });
app.use((req, res) => {res.status(404).send("Ooops, you took a wrong turn !" ) });