export const setLastVisit=(req,res,next)=>{
    if(req.cookies.lastVisit){
        res.locals.lastVisit=new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie('lastVisit',new Date().toISOString(),{
        maxAge:1*24*60*60*1000
    })
    next();
}

export const setJobPostedOn = (req, res, next) => {
    if (!req.cookies.jobPostedOn) {
        res.cookie('jobPostedOn', new Date().toISOString(), {
            maxAge: 30 * 24 * 60 * 60 * 1000,

        });
    }
    // next();
};

export const setLastUpdatedJob = (req, res, next) => {
    if (req.method === 'GET' && req.path.startsWith('/updateJob')) {
        res.cookie('lastUpdatedOn', new Date().toISOString(), {
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
    }
    next();
};