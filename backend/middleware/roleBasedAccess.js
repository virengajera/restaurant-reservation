module.exports.isCustomer = function (req,res,next){

    let user = res.locals && res.locals.user

    if(!user){
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
    if(user === "customer"){

        next()

    }
    else{
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
}

module.exports.isRestaurantOwner = function (req,res,next){

    let user = res.locals && res.locals.user

    if(!user){
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
    if(user === "restaurantowner"){

        next()

    }
    else{
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
}

module.exports.isWaiter = function (req,res,next){

    let user = res.locals && res.locals.user

    if(!user){
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
    if(user === "waiter"){

        next()

    }
    else{
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
}

module.exports.isAdmin = function (req,res,next){

    let user = res.locals && res.locals.user

    if(!user){
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
    if(user === "admin"){

        next()

    }
    else{
        return res.status(403).json({status: 'Failure', msg: 'Access Denied'});
    }
    
}

