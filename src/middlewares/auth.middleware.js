
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'No estas autorizado'
        })
    }

    jwt.verify(token, 'charlie2024', (err, decoded) => {
        if (err) return res.status(401).json({
          message:'No estas autorizado'  
        })
       req.userId = decoded.id;
       req.userName = decoded.name;
       //console.log(decoded);
        next();
    })
}