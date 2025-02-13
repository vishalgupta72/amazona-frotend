const jwt = require("jsonwebtoken");
// const {JWT_SECRET} = require('../config');

const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel');

module.exports = (req, res, next) =>{
    const {authorization} = req.headers;

    // Bearer sdfdsfsredsfaer
    if(!authorization){
        return res.status(401).json({error: "User is not logged in"});
    }
    
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, payload)=>{
        if(error){
            console.log(error);
            return res.status(401).json({error: "User is not logged in"});
        }
        const {_id} = payload;
        UserModel.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next(); // goes to the next middleware or goes to the REST API
        })
    })
}