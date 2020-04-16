import bddReq from '../database/userDb'


// =============================================================================
// connection base de donner get recup users
// =============================================================================

const getU = async(req, res) => {

    const{search} = req.query;
    console.log(search);

    if(search){
        
        let result = await bddReq.getUseSearch(search);
        console.log(result);
        res.status(200).render('pages/usersListe.html.twig' ,{result});
    }
    
    else{
        
        
        let result = await bddReq.getUsersList();
        res.status(200).render('pages/usersListe.html.twig' ,{result});
        console.log(result);

    }

};

// =============================================================================
// recup user par ID ok ---GET----
// =============================================================================
const getUserByID = async(req, res) => {

    const {id} = req.params;
    let methode = "get";
    let result = await bddReq.getUserId(id);
    console.log(result);
    const us = {users:result.rows}
    const info = us.users[0];
    res.status(200).render('pages/user.html.twig',{info,methode});

};


// =============================================================================
// delete by Id ---delete---
// =============================================================================

const delUser = async (req, res) => {
    const {id} = req.params;
    const {adminPassword} = req.body;
    console.log(adminPassword);

    if (adminPassword === "1111"){

        let del = await bddReq.deleteUser(id);
        let methode = "delete";
        //res.status(200).render('pages/user.html.twig', {del,methode});
        res.status(200).send('User supprimer avec success');

        

    } else {res.status(403).send(' le mode de passe ne corespond pas');}
    
};


// =============================================================================
//  add user ok postman   ----PUT-----
// =============================================================================
const inserUser = async(req,res) => {
    console.log(req.body);
    const {name,password,adminPassword} = req.body;

    if (adminPassword === "1111" && name && password ){

    await bddReq.insUser(name,password);
    res.status(200).send('user ajouter avec success');
    }else {res.status(403).send(' il y a un problémes');}
};

// =============================================================================
// modification ---POST-----
// =============================================================================
const modifUser = async(req,res) => {



    //----test si le password ---//
    const {id} = req.params;
    let result = await bddReq.getUserId(id);
    const us = {users:result.rows}
    const info = us.users[0];
    // console.log(info);
    
    const {name,password,newpassword,adminPassword} = req.body;
    // console.log(name);
    // console.log(password)
    // console.log(id);
    // console.log(newpassword);
    // const {id} = req.params;


    if(info.password === password || adminPassword === '1111'){


        await bddReq.modUser(name,newpassword,id);
        res.status(200).send('user mdifier avec success');

    }
    else{res.status(403).send(' le mode de passe ne corespond pas');}







};





export default {

    getU,
    getUserByID,
    inserUser,
    delUser,
    modifUser
    
    };  