import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { OTHER_TOKEN_SECRET, TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    
    const { token } = req.cookies;
    
    if(!token) return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;

        next();
    });
}

export const verifyTokenReset = async (req, res, next) => {

    const { id, resetToken } = req.params;

    const validUser = await User.findById({ _id: id, resetToken})

    if(validUser.resetToken === null) return res.status(401).json({ message: "The token has already been used, if you have forgotten your password, generate one again" });
    if(validUser.resetToken !== resetToken) return res.status(401).json({ message: "Token invalid"})

    jwt.verify(resetToken, OTHER_TOKEN_SECRET, (err) => {

        if(!err) return res.status(200).json({ message: "Token valid"})

        if(err) return res.status(401).json({ message: "The token has expired, you must generate another" });
        
        next();
    });
}