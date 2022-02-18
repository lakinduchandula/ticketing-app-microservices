import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

/**
 * We are telling to typescript inside of the Express project find the
 * interface of Request that was already defined take that append
 * additional property to it
 */
declare global {
  namespace Express {
    interface Request {
      // Modify (append) existing interface Request
      currentUser?: UserPayload; // "?" means optional
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if(!req.session || !req.session.jwt) = if(req.session?.jwt) # "?" is eqal to above OR comparison
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    // do nothing
  }

  next(); // wether or not we decode that jwt we need to move to ther middleware
};
