import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { ListaProducto } from "../../inventario/producto/lista-producto/lista-producto";
import { environment } from '../../../../environments/environment.development';
import { ProductoService } from '../../../core/services/producto.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from '@angular/material/core';
import { AlmacenService } from '../../../core/services/almacen.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { AlmacenInterface } from '../../../core/interfaces/AlmacenInterface';
import { SucursalInterface } from '../../../core/interfaces/SucursalInterface';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { NotaService } from '../../../core/services/nota.service';

@Component({
  selector: 'app-nota-compra',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ListaProducto, MatTableModule, MatPaginatorModule, FormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './nota-compra.html',
  styleUrl: './nota-compra.scss',
})
export class NotaCompra {

    displayedColumns: string[] = ['id', 'nombre', 'precio', 'almacenes', 'imagen', 'acciones'];

  urlBase: string = environment.servidor1;

  productoService = inject(ProductoService);

  lista_productos = signal<any[]>([]);

    lista_carrito = signal<any[]>([]);


  total = signal<number>(0);

  buscar = signal<string>("");
   almacenService = inject(AlmacenService);
  sucursalService = inject(SucursalService);
 sucursal_id = signal<number>(-1);
  almacen_id = signal<number>(-1);
 
  almacenes = signal<AlmacenInterface[]>([]);
  sucursales = signal<SucursalInterface[]>([]);
  proveedorService = inject(ProveedorService);
  notaService = inject(NotaService);

  proveedorSelected = signal<any>({})
  proveedores = signal<any>([]);

  almacenSelected = signal<any>(null)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit(): void {
    
    this.funListaProductos()

    this.paginator.page.pipe(
      tap(() => this.funListaProductos())
    ).subscribe()

   
  }

  constructor(){
    this.sucursalService.listar().subscribe({
      next: (res: SucursalInterface[]) => {
        this.sucursales.set(res);
      },
      error: (err) => console.error(err)
    });

    this.proveedorService.listar().subscribe({
      next: (res: any[]) => {
        this.proveedores.set(res);
      },
      error: (err) => console.error(err)
    });

    
  }

   
 funListarAlmacenes(): void {
    this.almacenService.listar(this.sucursal_id()).subscribe({
      next: (res: AlmacenInterface[]) => {
        this.almacenes.set(res);
      },
      error: (error) => console.error(error)
    });
  }

 funListaProductos(){
    this.productoService.listar(this.paginator?.pageIndex + 1, this.paginator?.pageSize, this.buscar()).subscribe({
      next: (res: any) => {
          let { data, total } = res;
          this.lista_productos.set(data);
          this.total.set(total);
      }
    })
  }

  funAddCarrito(prod: any){

    const objProducto = {id_producto:prod.id, nombre: prod.nombre, cantidad: 1, precio: prod.precio_venta_actual};

    this.lista_carrito.set([...this.lista_carrito(), objProducto]);
    console.log(this.lista_carrito());
  }

  seleccionarProveedor(proveedor: any){
    this.proveedorSelected.set(proveedor);
  }

  generarCompra(){
    if(this.lista_carrito().length === 0){
      alert('Debes agregar al menos un producto al carrito');
      return
    }

    if(!this.almacen_id()){
      alert("Debe seleccionar un almácen");
      return;
    }

    if(!this.proveedorSelected()){
      alert("Debe seleccionar un proveedor");
      return;
    }

    const productos = this.lista_carrito().map(item => ({
      producto_id: item.id_producto,
      almacen_id: this.almacen_id(),
      cantidad: item.cantidad,
      tipo_movimiento: 'ingreso',
      precio_compra: "0.00",
      precio_venta: "0.00"
    }));

    const data = {
      fecha: "10-08-2026",
      estado_nota: 'pendiente',
      observaciones: "ninguno",
      tipo_nota: "compra",
      clienteproveedor_id: this.almacen_id(),
      movimientos: productos,
      user_id: "64dd7e8e-9c9b-482d-b78c-0d44a4f1a4ee"
    }

    console.log(data);

    this.notaService.guardar(data).subscribe({
      next: (res: any) => {
        alert("Compra Registrada");
      }
    })
    
  }

}

