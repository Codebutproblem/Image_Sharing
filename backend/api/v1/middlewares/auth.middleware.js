import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) =>{
    const authorizationHeader = req.headers['authorization'];
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({message: "access-token-not-found"});
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({message: "invalid-token"});
        }
        delete user.iat;
        delete user.exp;
        req.user = user;
        next();
    });
}