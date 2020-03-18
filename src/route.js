import { Router } from "express";
import GlobalController from "./controllers/GlobalController" ;
import usersController from "./controllers/usersController";


const api = ({}) => {

    const routes = Router();
    routes.get( '/', GlobalController.acceuil);
    routes.get('/test',GlobalController.test );
    routes.get('/lists',usersController.getU );

    routes.get('/lists/:id',usersController.getUserByID);
    

    routes.put('/lists',usersController.inserUser);
    routes.delete("/lists/:id", usersController.delUser);


    return routes;


};
export default api;