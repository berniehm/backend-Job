const User = require('../model/User')
const tokenController = require('./tokenController')

const userController = () => {
    return {
        getUsers : async (req,res) => {
            if(!req.query.token){
                return res.send({error : "Please Login to visit this page"})
            }

            const {id, role} = await tokenController().verifyToken(req.query.token) ;

            if(role === "admin"){
                const users = await User.find({}) ;
                if(!users){
                    res.send({error : "No users Found"})
                }else{
                    res.send(users);
                }
            }else{
                res.send({error : "You are probhited to visit this page"})
            }           
        },

        addUser : async (req,res)=>{
            const newUser = new User({...req.body, role : "emp"});
            const user = await newUser.save();

            if(!user){
                res.send({error : "No user Added"})
            }else{
                res.send({user : user.fname});
            }
        },

        deleteUser : async (req,res) => {
            if(!req.body.token){
                return res.send({error : "Please Login to visit this page"})
            }

            const {id, role} = tokenController().verifyToken(req.body.token) ;

            if(role === "admin"){
                const user = await User.findByIdAndRemove(id) ;
                if(!user){
                    res.send({error : "No user Deleted"})
                }else{
                    res.send(user);
                }
            }else{
                res.send({error : "You are probhited to visit this page"})
            }
        },

        userProfile : async (req,res) => {
            if(!req.body.token){
                return res.send({error : "Please Login to visit this page"})
            }

            const {id, role} = tokenController().verifyToken(req.body.token) ;

            if(role === "admin" && req.body.id){
                const user = await User.findById(req.body.id);
                if(!user){
                   return res.send({error : "No user found"})
                }else{
                  return res.send(user);
                }
            }else{
                const user = await User.findById(id);
                if(!user){
                   return res.send({error : "No user found"})
                }else{
                  return res.send(user);
                }
            }
        },

        loginUser : async (req,res)=>{
            const user = await User.findOne({email : req.body.email, password : req.body.password});
            if(!user){
                return res.send({error : "No user found"})
             }else{
               const token = await tokenController().createToken(user._id, user.role) ;
               return res.send({user : user.fname, role:user.role, token})
             }
        },

        verifyUser : async (req,res) =>{
            if(!req.query.token){
                return res.send({error : "Token is not passed"})
            }

            const {id, role} = await tokenController().verifyToken(req.query.token) ;

            if(!id){
                return res.send({error : "Token is not invalid"})
            }else{
                return res.send({role})
            }
        }
    }
}

module.exports = userController ;