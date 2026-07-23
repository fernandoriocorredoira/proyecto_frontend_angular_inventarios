import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto.service';

@Component({
  selector: 'app-lista-producto',
  imports: [],
  templateUrl: './lista-producto.html',
  styleUrl: './lista-producto.scss',
})
export class ListaProducto implements OnInit{

  productoService = inject(ProductoService);

  lista_productos = signal<any[]>([]);

  ngOnInit(): void{
    this.funListaProductos()
  }

  funListaProductos(){
    this.productoService.listar(1, 5).subscribe({
      next: (res: any) => {
          let { data, total } = res;
          this.lista_productos.set(data);
      }
    })
  }
}
