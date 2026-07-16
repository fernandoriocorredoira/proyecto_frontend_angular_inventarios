import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loading= signal<boolean>(false);

  // formulario reactivo
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  respuesta_login = signal<any>({})
  router = inject(Router)

  //authService2 = inject(AuthService)
  // constructor con Inyección de dependencia
  constructor(private authService: AuthService){}

  funIngresarConLaravel(){
    // validar
    if(this.loginForm.valid){
      this.loading.set(true);
      this.authService.funLoginLaravel(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          // almacen el token en localStorage
          localStorage.setItem("access_token", res.access_token)
          this.loading.set(false);
          this.respuesta_login.set(res)
          this.router.navigate(["/admin/perfil"])
        },
        error: (err: any) => {
          this.loading.set(false);
          alert("Error al Ingresar")
        }
      })

    }else{
      alert("Verifique los datos antes de ingresar al sistema")
    }

  }

}
