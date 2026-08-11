import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Service()
export class NotaService {
    urlBase = environment.servidor1;

    http = inject(HttpClient);
    listar(){
        return this.http.get<any[]>(`${this.urlBase}/nota`)
    }

    guardar(datos: any){
        return this.http.post(`${this.urlBase}/nota`, datos);
    }

    mostrar(id: number){
        return this.http.get<any>(`${this.urlBase}/nota/${id}`)
    }

    modificar(id: number, datos: any){
        return this.http.patch(`${this.urlBase}/nota/${id}`, datos);
    }

    eliminar(id: number){
        return this.http.delete(`${this.urlBase}/nota/${id}`);
    }
}
