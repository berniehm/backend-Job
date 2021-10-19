const multer = require('multer');


const uploads = multer({
    limits: {
        fileSize: 10000000
    },              // allowed 10mb size 
    fileFilter(req, file, cb) {
        if (! file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            return cb(new Error('please upload appropriate format of image..'));
        }

        cb(undefined, true);
    }
});


/** import controller */
const jobController = require('../controller/jobController');

const jobRouter = (app) =>{
    app.post("/user/jobs", jobController().getJobs ); 

    app.post("/jobs/addjob", jobController().addJob);
    app.post("/jobs/:id/addjob", jobController().addJob);
    app.delete("/jobs/:id", jobController().deleteJob);

    app.post("/user/:id/jobs", jobController().getJobs ); 

    app.put("/jobs/updatejob", jobController().updateJob);

    app.post("/jobs/uploaddocument", uploads.single('doc'), jobController().uploadDocument);
    app.post("/jobs/assignjob",jobController().assingJob);

    app.post("/user/currentjob/:id", jobController().getCurrentJob);
    app.get("/jobs/getdocument/:id",jobController().getDocument);
}

module.exports = jobRouter ; 