import { RequestHandler } from "express";

//Initialize vars for all partials of global mode
const setPartialsData: RequestHandler = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
};

export default setPartialsData;
