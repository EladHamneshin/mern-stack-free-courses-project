import { Request, Response, NextFunction } from 'express';
import {Error as mongooseError} from 'mongoose';


const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(STATUS_CODES.NOT_FOUND);
  next(error);
};

const errorHandler = (error: mongooseError.CastError | Error ,req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === STATUS_CODES.OK ? STATUS_CODES.INTERNAL_SERVER_ERROR : res.statusCode;
  let message = error.message;

  // If Mongoose not found error, set to 404 and change message
  if (error instanceof mongooseError.CastError) {
    statusCode = STATUS_CODES.NOT_FOUND;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export { notFound, errorHandler };