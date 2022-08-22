exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403),send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponennt('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
}

exports.isAdmin = (req, res, next) =>{
    console.log(req);
    if(req.params.id === 'admin'){
        next();
    }else{
        const message = encodeURIComponennt('관리자 권한이 필요합니다.');
        res.redirect(`/?error=${message}`);
    }
}