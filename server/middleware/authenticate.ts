
import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ error: "User not authenticated" }); // Unauthorized access
  }
}
