import bddReq from '../database/messDb';
import bddReqU from '../database/userDb'; //recup du get by id pour verification du mots de passe



// =============================================================================
// connection base de donner get recup les messages par users
// =============================================================================

const getMess = async(req, res) => {

    const{search} = req.query;
    console.log(search);
    const {id} = req.params;

    if(search){

        let result = await bddReq.getMessSearch(search);
        console.log(result);
        res.status(200).render('pages/userMessages' ,{result});

    }

    
    else{

        let result = await bddReq.getMessage(id);
        res.status(200).render('pages/userMessages' ,{result});

    }
    

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






export default {

    getMess,
    inserMess

    
    }; 