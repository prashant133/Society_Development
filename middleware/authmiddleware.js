
// to check if the user is login and create as session id
const isAuth =(req,res ,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        return res.status(400).send({
            success : false,
            message : "Not Logged In"
        })
    }

}

// check if it is admin
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next(); // If user is admin, allow access to the next middleware/route handler
  } else {
    return res.status(403).send({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

module.exports = { isAdmin , isAuth};

