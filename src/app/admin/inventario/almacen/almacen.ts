import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlmacenInterface } from '../../../core/interfaces/AlmacenInterface';
import { AlmacenService } from '../../../core/services/almacen.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { SucursalInterface } from '../../../core/interfaces/SucursalInterface';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './almacen.html',
  styleUrl: './almacen.scss',
})
export class Almacen implements OnInit {
  almacenes = signal<AlmacenInterface[]>([]);
  sucursales = signal<SucursalInterface[]>([]);

  almacenService = inject(AlmacenService);
  sucursalService = inject(SucursalService);

  sucursal_id = signal<number>(-1);

  // Modelo temporal para el formulario
  formAlmacen: AlmacenInterface = this.getInitialState();

  // Columnas para la tabla de Material
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'descripcion', 'acciones'];

  ngOnInit(): void {
    this.funListarAlmacenes();

    this.sucursalService.listar().subscribe({
      next: (res: SucursalInterface[]) => {
        this.sucursales.set(res);
      },
      error: (err) => console.error(err)
    });
  }

  getInitialState(): AlmacenInterface {
    return { id: undefined, nombre: '', codigo: '', descripcion: '', sucursalId: -1 };
  }

  funListarAlmacenes(): void {
    this.almacenService.listar(this.sucursal_id()).subscribe({
      next: (res: AlmacenInterface[]) => {
        this.almacenes.set(res);
      },
      error: (error) => console.error(error)
    });
  }

  funGuardarAlmacen(): void {
  if (!this.formAlmacen.nombre || this.formAlmacen.sucursalId === -1) {
    alert('Por favor complete los campos obligatorios.');
    return;
  }

  // Detectamos si es actualización o creación según la existencia de `id`
  const request$ = this.formAlmacen.id 
    ? this.almacenService.modificar(this.formAlmacen.id, this.formAlmacen)
    : this.almacenService.guardar(this.formAlmacen);

  request$.subscribe({
    next: () => {
      this.funListarAlmacenes();
      this.funLimpiarFormulario();
    },
    error: (error) => console.error('Error al procesar almacén:', error)
  });
}

funEliminarAlmacen(id: number): void {
  if (confirm('¿Está seguro de eliminar este almacén?')) {
    this.almacenService.eliminar(id).subscribe({
      next: () => this.funListarAlmacenes(),
      error: (error) => console.error('Error al eliminar almacén:', error)
    });
  }
}

  funEditarAlmacen(item: AlmacenInterface): void {
    // Clonamos el objeto para evitar modificar la tabla antes de guardar
    this.formAlmacen = { ...item };
  }


  funLimpiarFormulario(): void {
    this.formAlmacen = this.getInitialState();
  }
}