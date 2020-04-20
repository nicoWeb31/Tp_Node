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
// Un utilisateur ne peut envoyer un message qu’en son nom ( PUT /user/:userId/message )  ok 
// =============================================================================

const inserMess = async(req,res) => {


    const {receiver,title,content} = req.body;
    console.log(req.body);
    const {id} = req.params;
    console.log(id);

    const user = await bddReqU.getUserId(req.session.passport.user);


    if(parseInt(id, 10) === req.session.passport.user){

        await bddReq.insMessage(id,receiver,title,content);
        res.status(200).send('message ajouter avec success');
    }

    else{res.status(403).send('pas autoriser a inserer le message');}


};



// =============================================================================
// delete Message
//Seul un admin peut supprimer un message (DELETE /message/:messageId)
// =============================================================================
const deleteMessage = async(req,res) => {

    const {id} = req.params;



    const user = await bddReqU.getUserId(req.session.passport.user);
    console.log(user);
    if (user.rows[0].is_admin === 1) {

        let del = await bddReq.deleteMessage(id);
        res.status(200).send('Message supprimer avec success');

    } else {res.status(403).send('pas autoriser a supprimer le message');}

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