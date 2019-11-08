import {Injectable} from '@angular/core';
import {host} from '../shared/hosts/main.host';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorHandling} from '../shared/utils/error-handling';

@Injectable()
export class CategoriaService {
  private url = `${host}Categoria`;

  constructor(private http: HttpClient,
              private errorHandling: ErrorHandling) {
  }

  get(): Observable<any> {
    const url = `${this.url}/Get`;
    return this.http.get(url).catch(this.errorHandling.handleError);
  }

}
