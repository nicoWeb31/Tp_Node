import { Router } from "express";
import GlobalController from "./controllers/GlobalController" ;
const api = ({}) => {

const routes = Router();
routes.get( '/', GlobalController. acceuil);
return routes;

};
export default api;