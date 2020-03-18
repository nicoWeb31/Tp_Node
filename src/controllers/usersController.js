import bddReq from '../database/userDb'


// =============================================================================
// connection base de donner get recup users
// =============================================================================

const getU = async(req, res) => {

    let result = await bddReq.getUsersList();
    res.status(200).render('pages/usersListe' ,{result});

};

// =============================================================================
// recup user par ID ok ---GET----
// =============================================================================
const getUserByID = async(req, res) => {

    const {id} = req.params;
    let result = await bddReq.getUserId(id);
    console.log(id);
    const us = {users:result.rows}
    const info = us.users[0];
    res.status(200).render('pages/user',{info});

};


// =============================================================================
// delete by Id ---delete---
// =============================================================================

const delUser = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    let del = await bddReq.deleteUser(id);
    let methode = "delete";
    res.status(200).render('pages/user', {del,methode});
    console.log(methode);
};


// =============================================================================
//  add user ok postman   ----PUT-----
// =============================================================================
const inserUser = async(req,res) => {
    console.log(req.body);
    const {name,password} = req.body;
    await bddReq.insUser(name,password);
    res.status(200).send('user ajouter avec success');
};

// =============================================================================
// modifrication ---POST-----
// =============================================================================






export default {

    getU,
    getUserByID,
    inserUser,
    delUser
    
    };  