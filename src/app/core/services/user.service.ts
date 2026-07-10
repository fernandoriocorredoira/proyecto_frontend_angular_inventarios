import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Service()
export class UserService {
    urlBase = environment.servidor2;

    http = inject(HttpClient);

    funListar(){
        return this.http.get(`${this.urlBase}/users`);
    }

    funGuardar(datos: any){
        return this.http.post(`${this.urlBase}/users`, datos);
    }

    funMostrar(id: string){
        return this.http.get(`${this.urlBase}/users/${id}`);
    }

    funModificar(id: string, datos: any){
        return this.http.patch(`${this.urlBase}/users/${id}`, datos);
    }

    funEliminar(id: string){
        return this.http.delete(`${this.urlBase}/users/${id}`);
    }
}
