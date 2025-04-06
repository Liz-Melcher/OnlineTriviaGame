import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization']
  if(!authHeader) {
    return void res.status(403).json({ message: "No Authorization Header" });
  }

  const token = (authHeader! as string).split(' ')[1];

  if(!token) {
    return void res.status(403).json({ message: "No Token Sent. Must be in format 'Bearer {token}" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, decoded: any) => {
    if(err) {
      return res.status(403).json({ message: "Token Expired" });
    }
    req.username = decoded.username;
    next()
  });
};

export default authenticateToken;