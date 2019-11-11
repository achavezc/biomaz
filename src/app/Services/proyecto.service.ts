import {Injectable} from '@angular/core';
import {host} from '../shared/hosts/main.host';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorHandling} from '../shared/utils/error-handling';

@Injectable()
export class ProyectoService {
  private url = `${host}Proyecto`;

  constructor(private http: HttpClient,
              private errorHandling: ErrorHandling) {
  }

  getProyectosPorCategoria(): Observable<any> {
    const url = `${this.url}/GetProyectosPorCategoria`;
    return this.http.post(url,null).catch(this.errorHandling.handleError);
  }

}