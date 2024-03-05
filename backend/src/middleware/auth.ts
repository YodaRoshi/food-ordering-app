import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

// Adds userId and auth0Id to request
declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string;
        }
    }
}
// Validates jwt token in request has come our from auth0 server
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});
// take the access token and get some info out of it
export const jwtParse = async (
    req:Request, 
    res:Response, 
    next: NextFunction
    )=>{
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")){
        return res.sendStatus(401)
    }

    const token = authorization.split(" ")[1];

    try{
        const decoded  = jwt.decode(token) as jwt.JwtPayload
        const auth0Id = decoded.sub; // holds auth0id

        const user = await User.findOne({auth0Id})
        if(!user){
            return res.sendStatus(401);
        }
        //  as string tells auth0Id is string 
        req.auth0Id = auth0Id as string; 
        req.userId = user._id.toString();
        next();
    }catch(error){
        return res.sendStatus(401);
    }
}