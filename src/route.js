import { Router } from "express";
import GlobalController from "./controllers/GlobalController" ;
import usersController from "./controllers/usersController";
import messController from "./controllers/messController";


const api = ({}) => {

    const routes = Router();

    //route du global controller
    routes.get( '/', GlobalController.acceuil);
    routes.get('/test',GlobalController.test );

    //route du user controller
    routes.get('/users',usersController.getU );
    routes.get('/user/:id',usersController.getUserByID);
    routes.put('/users',usersController.inserUser);
    routes.delete("/user/:id", usersController.delUser);
    routes.post("/user/:id",usersController.modifUser);

    //route du message controller
    routes.get('/user/:id/messages',messController.getMess );
    routes.put('/user/:id/message',messController.inserMess);


    return routes;


};
export default api;