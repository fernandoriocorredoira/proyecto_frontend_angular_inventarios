import { Component } from '@angular/core';
import { ListaProducto } from "./lista-producto/lista-producto";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './producto.html',
  styleUrl: './producto.scss',
})
export class Producto {}
