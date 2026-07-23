import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.scss',
})
export class NuevoProducto {}
