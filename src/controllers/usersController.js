import bddReq from '../database/userDb';
import bcrypt from "bcrypt";


// =============================================================================
// connection base de donner get recup users
// =============================================================================

const getU = async (req, res) => {

    const {
        search
    } = req.query;
    console.log(search);

    if (search) {

        let result = await bddReq.getUseSearch(search);
        console.log(result);
        res.status(200).render('pages/usersListe.html.twig', {
            result
        });
    } else {


        let result = await bddReq.getUsersList();
        res.status(200).render('pages/usersListe.html.twig', {
            result
        });
        console.log(result);

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
    console.log(result);
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
// =============================================================================

const delUser = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        adminPassword
    } = req.body;
    console.log(adminPassword);

    if (adminPassword === "1111") {

        let del = await bddReq.deleteUser(id);
        let methode = "delete";
        //res.status(200).render('pages/user.html.twig', {del,methode});
        res.status(200).send('User supprimer avec success');



    } else {
        res.status(403).send(' le mode de passe ne corespond pas');
    }

};


// =============================================================================
//  add user ok postman   ----PUT-----
// =============================================================================
const inserUser = async (req, res) => {
    console.log(req.body);
    const {
        name,
        password
    } = req.body;
    const user = await userDb.getUser(req.session.passport.user);
    if (user.rows[0].is_admin === 1) {

        await bddReq.putUser(name, await bcrypt.hashSync(password, 12));
        res.status(200).send(`L'utilisateur ${name} a bien été inséré`);
    } else {
        res.status(403).send("Vous n'avez pas la permission d'effectuer l'opération");
    }
};

// =============================================================================
// modification ---POST-----
// =============================================================================
const modifUser = async (req, res) => {

            const {
                id
            } = req.params;
            const {
                name,
                newpassword
            } = req.body;
            const user = await userDb.getUser(req.session.passport.user);

            if (parseInt(userId, 10) === req.session.passport.user || user.rows[0].is_admin === 1) {
                if (user.rows.length > 0) {
                    await bddReq.postUser(id, name, await bcrypt.hashSync(newpassword, 12));
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