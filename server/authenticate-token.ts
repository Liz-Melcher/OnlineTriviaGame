import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  if(!authHeader) {
    return res.status(403).json({ message: "No Authorization Header" });
  }

  const token = (authHeader! as string).split(' ')[1];

  if(!token) {
    return res.status(403).json({ message: "No Token Sent" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, user: any) => {
    if(err) {
      return res.status(403).json({ message: "Token Expired" });
    }

    next()
  });
};

export default authenticateToken;