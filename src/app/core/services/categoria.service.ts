import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CategoriaInterface } from '../interfaces/CategoriaInterface';

@Service()
export class CategoriaService {
    urlBase = environment.servidor1;

    http = inject(HttpClient);

    listar(){
        return this.http.get<CategoriaInterface[]>(`${this.urlBase}/categoria`)
    }

    guardar(datos: CategoriaInterface){
        return this.http.post(`${this.urlBase}/categoria`, datos);
    }

    mostrar(id: number){
        return this.http.get<CategoriaInterface>(`${this.urlBase}/${id}`)
    }

    modificar(id: number, datos: CategoriaInterface){
        return this.http.patch(`${this.urlBase}/categoria/${id}`, datos);
    }

    eliminar(id: number){
        return this.http.delete(`${this.urlBase}/categoria/${id}`);
    }
}
