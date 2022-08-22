exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403),send('needLogin');
    }
}

exports.isNotLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = 'alreadyloggedin';
        res.redirect(`/?error=${message}`);
    }
}

exports.isAdmin = (req, res, next) =>{
    const email = res.locals.user.email
    if(email === 'admin'){
        next();
    }else{
        const message = 'onlyForAdmin';
        res.redirect(`/?error=${message}`);
    }
}