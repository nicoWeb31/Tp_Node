import DbConnection from "./db";

const getUsersList = async() => {
    
    let bdd = new DbConnection();
    return await bdd.performQuery( 'select * from users', [])

};


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


    export default {
        getUsersList,
        getUserId,
        deleteUser,
        insUser


    }