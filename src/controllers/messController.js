import bddReq from '../database/messDb';
import bddReqU from '../database/userDb'; //recup du get by id pour verification du mots de passe



// =============================================================================
// connection base de donner get recup les messages par users
// =============================================================================

const getMess = async(req, res) => {

    const{search} = req.query;
    const {id} = req.params;
    console.log(id);
    let messages;

    if(search){

        messages = await bddReq.getMessSearch(id,search);
    }else{
        
        messages = await bddReq.getMessage(id);
    }
    res.status(200).render('pages/userMessages.html.twig' ,{ id: parseInt(id, 10), messages: messages.rows });
    console.log(messages.rows);

};


// =============================================================================
// insert message 
// =============================================================================

const inserMess = async(req,res) => {


    
    //----test si le password ---//
    const {id} = req.params;
    let result = await bddReqU.getUserId(id);
    const us = {users:result.rows}
    const info = us.users[0];
    // console.log(info.password);

    const {receiver,password,title,content} = req.body;

    if(info.password === password){

        await bddReq.insMessage(id,receiver,title,content);
        res.status(200).send('message ajouter avec success');
    }

    else{res.status(403).send(' le mode de passe ne corespond pas');}


};


const deleteMessage = async(req,res) => {

    const {id} = req.params;
    // const {adminPassword} = req.body;
    //console.log(adminPassword);

    // if (adminPassword === "1111"){

        let del = await bddReq.deleteMessage(id);
        //let methode = "delete";
        //res.status(200).render('pages/user.html.twig', {del,methode});
        res.status(200).send('Message supprimer avec success');

        

    // } else {res.status(403).send(' le mode de passe ne corespond pas');}

};

// =============================================================================
// modification ---POST-----
// =============================================================================
const modifMessage = async(req,res) => {


    
    const {title,content} = req.body;
    console.log(title);
    console.log(content);
    
    
    const {id} = req.params;
    console.log(id);
    await bddReq.modMessage(title,content,id);
    res.status(200).send('user mdifier avec success');


};



export default {

    getMess,
    inserMess,
    deleteMessage,
    modifMessage

    
    }; 