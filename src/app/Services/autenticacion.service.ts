import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import {host} from '../shared/hosts/main.host';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AutenticacionService
 {
    private url = `${host}Authenticate`;

    public token: string;
    constructor(private _http: HttpClient, private _Route: Router)
    {

    }
    

    public validateLoginUser(userName: string, password: string)
    {
        const url = `${this.url}`;
        const body: any = {
            UserName: userName,
            Password: password,
            Token: '',
          };

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(url, body, { headers: headers })
            .pipe(tap(data =>
            {              

                if (data.Token != null)
                {
                   
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    
                    // return true to indicate successful login
                    return data;
                } 
                else {
                    // return false to indicate failed login
                    return null;
                }
            }),
                catchError(this.handleError)
            );
    }

    LogoutUser() {
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() 
    {             
        let currentUser : any;

         localStorage.getItem('currentUser');  

        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        let usuario: any = {
            Autenticado: false,
            MiembroId: ""
           };   

        if(currentUser)  
        {            
            usuario.Autenticado=true; 
            usuario.MiembroId=currentUser.MiembroId;             
        }
          

          return usuario;
      }  

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}