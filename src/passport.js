import passport from "passport";
import bcrypt from "bcrypt";
import Strategy from "passport-local/lib/index";
import userDb from "./database/userDb";

const authen = () =>{
    return (req,rep,next) =>{
        if(req.isAuthenticated()){
            return next();
        }
        rep.redirect('/login')
    }
}

const findUser = async (username,callback) => {
    const result = await userDb.getUserByUserName(username);
    if(result.rows.length > 0){
        callback(null, result.rows[0]);
    }else
    {
        callback(null)
    }
}

const findUserById = async(id,callback) =>{
    const result = await userDb.getUserId(id);
    if(result.rows.length > 0){
        callback(null, result.rows[0]);
    }else
    {
        callback(null)
    }

}

const passportInitialization = () =>{
    passport.authenticationMiddleware = authen;

    passport.use(new Strategy(
        (username,password,done) =>{
            findUser(username, (err,user)=>{
                if(!user){
                    return done(null,false);
                }
                bcrypt.compare(password,user.password, (err,isValid)=>{
                    if (err){
                        return done(null,false);
                    }
                    if(!isValid){
                        return done(null,false)
                    }
                return done(null, user);    
                })
                
            })
        }
    ))
    passport.serializeUser((user,cb)=>{
        cb(null , user.id);
        
    });
    passport.deserializeUser((userId,cb)=>{
        findUserById(userId , cb);
    })
}

export default passportInitialization;