import { Router } from "express";
import GlobalController from "./controllers/GlobalController" ;
import usersController from "./controllers/usersController";
import messController from "./controllers/messController";
import passport from "passport";


const api = ({}) => {

    const routes = Router();

    //route du global controller
    routes.get( '/', GlobalController.acceuil);
    //routes.get('/test',GlobalController.test );

    //route du user controller
    routes.get('/users',passport.authenticationMiddleware(),usersController.getU );
    routes.get('/user/:id',passport.authenticationMiddleware(),usersController.getUserByID);
    routes.put('/users',passport.authenticationMiddleware(),usersController.inserUser);
    routes.delete("/user/:id",passport.authenticationMiddleware(), usersController.delUser);
    routes.post("/user/:id",passport.authenticationMiddleware(),usersController.modifUser);

    //route du message controller
    routes.get('/user/:id/messages',passport.authenticationMiddleware(),messController.getMess );
    routes.put('/user/:id/messages',passport.authenticationMiddleware(),messController.inserMess);
    routes.delete('/user/message/:id',passport.authenticationMiddleware(),messController.deleteMessage);
    routes.post("/user/message/:id",passport.authenticationMiddleware(),messController.modifMessage);

    routes.get("/login",usersController.log);

    routes.post( '/login' , passport.authenticate( 'local', {
        successRedirect : '/users' ,
        failureRedirect : '/login'
        }));


    return routes;


};
export default api;