import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    req.userId = decoded.userID;
    next();
  } catch (error) {
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
};

export default verifyToken;
