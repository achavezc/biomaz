import {Observable} from 'rxjs/Observable';
import {NotFoundError} from '../services/not-found-error';
import {BadRequestError} from '../services/bad-request-error';
import {AppError} from '../services/app-error';
import {Injectable} from '@angular/core';

@Injectable()
export class ErrorHandling {
  constructor() {
  }

  handleError(error: Response) {
    switch (error.status) {
      case 400:
        return Observable.throw(new BadRequestError());
      case 404:
        return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }
}
