import DbConnection from "./db";





const getMessage = async(id) => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery("SELECT * FROM messages WHERE id_sender=? OR " +
    "id_receiver=?", [id, id]);

};


const getMessSearch = async(text) =>{

    let bdd = new DbConnection();
    return await bdd.performQuery("SELECT * FROM messages WHERE ( id_sender=? OR " +
    "id_receiver=? ) AND ( UPPER(title) LIKE UPPER(?) OR UPPER(content) LIKE UPPER(?) )", [id, id, `%${search}%`, `%${search}%`]);
    //return await bdd.performQuery( "SELECT * FROM messages WHERE UPPER(title) LIKE UPPER (?) OR UPPER(content) LIKE UPPER (?) ",['%'+text+'%','%'+text+'%'])

}


const insMessage = async(idS,idR,title,content) => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery( "INSERT INTO messages (id_sender,id_receiver,title,content) VALUES (?, ?, ?, ?)", [idS,idR,title,content])

};



export default {

    getMessage,
    insMessage,
    getMessSearch

}