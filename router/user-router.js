
/** import controller */
const userController = require('../controller/userController');

const userRouter = (app) =>{
    app.post("/admin/users", userController().getUsers );
    app.post("/users/adduser", userController().addUser);
    app.post("/users/login", userController().loginUser); 
    app.post("/userprofile/", userController().userProfile);
    app.get("/verifyuser", userController().verifyUser);
}

module.exports = userRouter ; 

