import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { IExeptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
