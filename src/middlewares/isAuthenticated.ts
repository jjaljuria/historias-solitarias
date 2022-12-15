import { RequestHandler } from "express";

const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json("You need authenticate");
  }

  next();
};

export default isAuthenticated;
