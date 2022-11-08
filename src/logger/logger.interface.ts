import { NextFunction, Request, Response } from 'express';

export interface ILogger {
  log: (args: any | any[]) => void;
  error: (args: any | any[]) => void;
  warn: (args: any | any[]) => void;
}
