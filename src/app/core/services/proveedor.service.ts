import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SucursalInterface } from '../interfaces/SucursalInterface';

@Service()
export class ProveedorService {
    urlBase = environment.servidor1;

    http = inject(HttpClient);
    listar(){
        return this.http.get<any[]>(`${this.urlBase}/cliente-proveedor`)
    }

    guardar(datos: SucursalInterface){
        return this.http.post(`${this.urlBase}/cliente-proveedor`, datos);
    }

    mostrar(id: number){
        return this.http.get<any>(`${this.urlBase}/cliente-proveedor/${id}`)
    }

    modificar(id: number, datos: any){
        return this.http.patch(`${this.urlBase}/cliente-proveedor/${id}`, datos);
    }

    eliminar(id: number){
        return this.http.delete(`${this.urlBase}/cliente-proveedor/${id}`);
    }
}
