import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: { userId: string; role: string; email: string }; // Include role
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

// Role-based access control middleware
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: You don't have permission" });
      return;
    }
    next();
  };
};

// Middleware to check if the user is an admin
export const isGeneralAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const generalAdminEmail = process.env.GENERAL_ADMIN_EMAIL;
  
  if (!req.user) {
    res.status(401).json({ message: "unauthorized: No user data"});
    return;
  }
  if ( req.user.email !== generalAdminEmail) {
     res.status(403).json({ message: "Forbidden: Only general admin can perform this action" });
     return;
  }
   next();
  };
  
export default authMiddleware;
