import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  authService = inject(AuthService);
  perfil = signal<any>({});
  router = inject(Router)

  constructor(){
    this.funObtenerPerfil()
  }

  funObtenerPerfil(){
    this.authService.funPerfil().subscribe({
      next: (res: any) => {
        this.perfil.set(res);
      },
      error: (error: any) => {
        console.log("Error al obtener el PERFIL");
      }
    }
    )
  }

  funSalir(){
    localStorage.removeItem("access_token");
    this.router.navigate(["/auth/login"]);
  }
}
