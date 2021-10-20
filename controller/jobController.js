const Job = require('../model/Job')
const sharp = require('sharp');
const tokenController = require('./tokenController');
const moment = require('moment');
const { response } = require('express');


const jobController = () => {
    return {
        getJobs : async (req,res) => {
            if(!req.query.token){
                return res.send({error : "You have not any token"})
            }

              let user_id = "";

            if(req.params.id){
                user_id = req.params.id ;
            }else{
                const {id, role} = await tokenController().verifyToken(req.query.token) ;
                if(!id){
                    return res.send({error : "Invalid Token"})
                }

                user_id = id ;
            }

            const jobs = await Job.find({user_id : user_id}) ;
            if(!jobs){
                res.send({error : "No Jobs Found"})
            }else{
                res.send(jobs);
            }
        },

        addJob : async (req,res)=>{
            if(!req.query.token ){
                return res.send("You are not authenticated..")
            }

            const {id, role} = await tokenController().verifyToken(req.query.token) ;

            let job ;

            if(role == "admin" && req.params.id){
               const newJob = new Job({...req.body, user_id : req.params.id});
                job = await newJob.save();
            }else{      
               const newJob = new Job({...req.body, user_id : id});
                job = await newJob.save();
            }


            if(!job){
                res.send({error : "No Job Added"})
            }else{
                res.send(job);
            }

        },

        assingJob : async (req,res)=>{
            if(!req.query.token){
                return res.send({error : "You have not passed any token"})   
            }
            const {id, role} =  await tokenController().verifyToken(req.query.token) ;
            if(role != 'admin'){
                return res.send({error : "You are not premitted to do this action"}) 
            }
            const newJob = new Job({...req.body});
            const job = await newJob.save();

            if(!job){
                res.send({error : "No Job Added"})
            }else{
                res.send(job);
            }

        },

        deleteJob : async (req,res) => {
            const id = req.params.id ;
            const job = await Job.findByIdAndRemove(id) ;
            
            if(!job){
                res.send({error : "No Jobs Deleted"})
            }else{
                res.send(job);
            }
        },

        updateJob : async (req,res) => {
            const {start, end , breakson, breaksover, details, notes, job_id, token} = req.body ;
            if(!job_id || !token){
                return  res.send({error: "You have not any job id or token to update .."})
              }
   
              const {id, role} = await tokenController().verifyToken(token) ;
   
              if(role !== "admin"){
               return  res.send({error: "You are prophited to update job .."})
             }else{
                const job = await Job.findByIdAndUpdate(job_id, {
                    start , end, details, notes
                });

                job.breaks[0] = breakson ;
                
                job.breaks[1] = breaksover ;

                await job.save();
   
                if(!job){
                   return  res.send({error: "Something went wrong while uploading job"})
                }
   
                res.send(job)
             }
   
        },
        getDocument:async (req,res) =>{
            if (!req.params.id){
                return res.send({error:"id not found"});
            }
            
            const job = await Job.findById(req.params.id) ;
               if(!job.documents){
                return res.send({error:"documents is not availble"});
               }

             res.set('Content-Type', 'application/pdf/cnd.openxmlformats-officedocument.spreadsheet.sheet');
               res.send(job.documents)
            
        },

        uploadDocument :async (req, res) => {
            //const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
            console.log(req.body.updoc)
            console.log(req.file.buffer)
            //req.user.avator = buffer;
            //await req.user.save();
            if(!req.file || !req.body.updoc){
                return res.send({error : "please upload file or provide id"});
            }

            const job  = await Job.findByIdAndUpdate(req.body.updoc, {documents : req.file.buffer}) ;
            
            res.send(job);
        },

        getCurrentJob : async (req,res) => {
            if(!req.params.id){
                return res.send({error : "user id is not found "})
            }

            const job = await Job.find({user_id : req.params.id, createdAt:{$gte:moment().format(moment.HTML5_FMT.DATE)}}); 
            if(job.length && !job[0].end && (!job[0].breaks.length || job[0].breaks.length > 1 )){
                res.send({status : "clocked in"})
            }else{
                res.send({status : "clocked out"})
            }
        }
    }
}

module.exports = jobController ;