
const jwt = require("jsonwebtoken");
const SECRET_KEY = "thesecretkeyforcreatingatokentovalidateuserauthentication";

const tokenController = () =>{
    return {
        createToken : async (id, role) => {
            const token = await jwt.sign(
                { id, role },
                SECRET_KEY
              );
            
              return token ;
        },

        verifyToken : async (token) => {
            const {id, role} = await jwt.verify(token, SECRET_KEY);
            return {id, role} ;
        }
    }
}

module.exports = tokenController ;