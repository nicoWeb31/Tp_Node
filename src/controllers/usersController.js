import bddReq from '../database/userDb';
import bcrypt from "bcrypt";


// =============================================================================
// connection base de donner get recup users
// =============================================================================

const getU = async (req, res) => {

    const {search} = req.query;

    // condition btn et id user session
    let admin ;

    const userSess = await bddReq.getUserId(req.session.passport.user);
    const userSessID = userSess.rows[0].id;

    if (userSess.rows[0].is_admin === 1){
        admin = true;
    }else{
        admin = false;
    };

    //codition id useur

    if (search) {

        let result = await bddReq.getUseSearch(search);

        res.status(200).render('pages/usersListe.html.twig', {
            result,admin,userSessID
        });
    } else {


        let result = await bddReq.getUsersList();
        res.status(200).render('pages/usersListe.html.twig', {
            result,admin,userSessID
        });


    }

};

// =============================================================================
// recup user par ID ok ---GET----
// =============================================================================
const getUserByID = async (req, res) => {

    const {
        id
    } = req.params;
    let methode = "get";
    let result = await bddReq.getUserId(id);

    const us = {
        users: result.rows
    }
    const info = us.users[0];
    res.status(200).render('pages/user.html.twig', {
        info,
        methode
    });

};


// =============================================================================
// delete by Id ---delete---
//Seul un admin peut supprimer un utilisateur (DELETE /user/:userId)
// =============================================================================

const delUser = async (req, res) => {
    const {
        id
    } = req.params;


    const user = await bddReq.getUserId(req.session.passport.user);

    if (user.rows[0].is_admin === 1) {

        let del = await bddReq.deleteUser(id);
        let methode = "delete";
        //res.status(200).render('pages/user.html.twig', {del,methode});
        res.status(200).send('User supprimer avec success');



    } else {
        res.status(403).send('pas autoriser a supprimer l\'utilisateur');
    }

};


// =============================================================================
//  add user ok postman   ----PUT----- avec condition de controle si admin
// =============================================================================
const inserUser = async (req, res) => {

    const {
        name,
        password
    } = req.body;
    const user = await bddReq.getUserId(req.session.passport.user);


    
    if (user.rows[0].is_admin === 1) {
        
        await bddReq.insUser(name, await bcrypt.hashSync(password, 12));
        res.status(200).send(`L'utilisateur ${name} a bien été inséré`);
    } else {
        res.status(403).send("Vous n'avez pas la permission d'effectuer l'opération");
    }
};

// =============================================================================
// modification ---POST----- avec condition de controle
// =============================================================================
const modifUser = async (req, res) => {

            const {id} = req.params;
            const {name,newpassword} = req.body;
            const user = await bddReq.getUserId(req.session.passport.user);

            if (parseInt(id, 10) === req.session.passport.user || user.rows[0].is_admin === 1) {
                if (user.rows.length > 0) {
                    await bddReq.modUser(id, name, await bcrypt.hashSync(newpassword, 12));
                    res.status(200).send("Utilisateur modifié");
                } else {
                    res.status(404).send("Not found");
                }
            } else {
                res.status(403).send("Vous n'avez pas la permission d'effectuer l'opération");

            };

        }

            const log = async (req, res) => {
                res.status(200).render('pages/login.html.twig');
            };

            export default {

                getU,
                getUserByID,
                inserUser,
                delUser,
                modifUser,
                log

            };