import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUsersController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    // this.ok(res, 'login');
    next(new HTTPError(401, 'Login error', 'Login'));
  }

  register(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'register');
  }
}
