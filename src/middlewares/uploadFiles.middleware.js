import multer from "multer";

const resumeStorageConfig=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/Applicant-resumes/');
    },
    filename:(req,file,cb)=>{
        const userFile=Date.now()+'-'+file.originalname;
        cb(null,userFile);
    }
})

export const uploadFile=multer({storage:resumeStorageConfig});