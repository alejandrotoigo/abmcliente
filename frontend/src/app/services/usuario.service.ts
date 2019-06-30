import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { Persona } from '../models/persona';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient) { }

    obtenerPersonas(): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const options = { headers: headers };
        return this.http.get<any>(environment.apiUrl + 'persona/', options);
    }

    eliminarPersona(idPersona: number): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const options = { headers: headers };
        return this.http.delete<any>(environment.apiUrl + 'persona/delete/' + idPersona, options);
    }

    registrarPersona(unaPersona: Persona): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const options = { headers: headers };
        return this.http.post<any>(environment.apiUrl + 'persona/save', JSON.stringify(unaPersona), options);
    }

    editarPersona(unaPersona: Persona): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const options = { headers: headers };
        return this.http.put<any>(environment.apiUrl + 'persona/update/' + unaPersona.perId, JSON.stringify(unaPersona), options);
    }
}