import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { CategoriaInterface } from '../../../core/interfaces/CategoriaInterface';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDialog } from './categoria-dialog/categoria-dialog';


@Component({
  selector: 'app-categoria',
  imports: [MatTableModule, MatIcon, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria implements OnInit{

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'accion'];

  // inyeccion de dependencias
  categoriaService = inject(CategoriaService);
  readonly dialog = inject(MatDialog);
  
  // atributos con signal
  categorias = signal<CategoriaInterface[]>([]);
  categoria = signal({nombre: "", descripcion: ""});
  
  // lo primero en ejecutar cuando el componente categoria carga
  ngOnInit(): void { 
    this.listarCategorias()
  }
  
  // métodos
  listarCategorias(){
    this.categoriaService.listar().subscribe({
      next: (res: CategoriaInterface[]) => {
        this.categorias.set(res);
      },
      error: (error: any) => {
        console.log(error);
        alert("Error al obtener las categorias");
      }
    });
  }

  abrirDialog(){
    const dialogRef = this.dialog.open(CategoriaDialog, {
      data: this.categoria()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.categoriaService.guardar(result).subscribe({
          next: (res) => {
            this.categoria.set({nombre: "", descripcion: ""})
            this.listarCategorias();
          },
          error: (error) => {
            alert("Ocurrió un Error al guardar la categoria")
          }
        })
      }
    });
  }

  abrirDialogEditar(cat: CategoriaInterface){
    const dialogRef = this.dialog.open(CategoriaDialog, {
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.categoriaService.modificar(result.id, result).subscribe({
          next: (res) => {
            this.categoria.set({nombre: "", descripcion: ""})
            this.listarCategorias();
          },
          error: (error) => {
            alert("Ocurrió un Error al guardar la categoria")
          }
        })
      }
    });
  }


}
