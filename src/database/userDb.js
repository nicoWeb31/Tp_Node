import DbConnection from "./db";

const getUsersList = async() => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery( 'select * from users')

};

const getUseSearch = async(name) =>{

    let bdd = new DbConnection();
    return await bdd.performQuery( "SELECT * FROM users WHERE UPPER(name) LIKE UPPER (?)",'%'+name+'%')

}



const getUserId = async(id) => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery( 'select * from users where id = ?', [id])

};


const deleteUser = async(id) => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery( 'Delete from users where id = ?', [id])

};

const insUser = async(name,password) => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery( "INSERT INTO users (name,password) VALUES (?, ?)", [name,password])

};


const modUser = async(name,pass,id) => {
    
    let bdd = new DbConnection();
    
    return await bdd.performQuery( "UPDATE users SET name = ?, password = ?  WHERE id = ?", [name,pass,id])

};






    export default {
        getUsersList,
        getUseSearch,
        getUserId,
        deleteUser,
        insUser,
        modUser


    }