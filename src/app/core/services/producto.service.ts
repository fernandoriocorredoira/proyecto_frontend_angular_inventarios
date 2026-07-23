import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Service()
export class ProductoService {
    urlBase = environment.servidor1;
    
        http = inject(HttpClient);

        listar(page: number = 1, limit: number=10, search: string="", almacenId: number=-1){
            return this.http.get<any[]>(`${this.urlBase}/producto?page=${page}&limit=${limit}&search=${search}&almacen=${almacenId}`)
        }
    
        guardar(datos: any){
            return this.http.post(`${this.urlBase}/producto`, datos);
        }
    
        mostrar(id: number){
            return this.http.get<any>(`${this.urlBase}/producto/${id}`)
        }
    
        modificar(id: number, datos: any){
            return this.http.patch(`${this.urlBase}/producto/${id}`, datos);
        }
    
        eliminar(id: number){
            return this.http.delete(`${this.urlBase}/producto/${id}`);
        }
}
