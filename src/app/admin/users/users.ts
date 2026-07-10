import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit{
  
  usuarios = signal<any>([]);
  userService = inject(UserService);
  user_id = signal<any>(-1)


  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });
  
  ngOnInit(): void {
    this.funObtenerUsuarios();
  }

  funObtenerUsuarios(){
    this.userService.funListar().subscribe({
      next: (res: any) => {
        this.usuarios.set(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  funGuardarUsuario(){
    if(this.user_id()){
      this.userService.funModificar(this.user_id(), this.userForm.value).subscribe({
        next: (res) => {
          this.funObtenerUsuarios();
          this.user_id.set(-1);
        }
      })

    }else{
      this.userService.funGuardar(this.userForm.value).subscribe({
        next: (res) => {
          this.funObtenerUsuarios();
        }
      })

    }
  }

  funEditarUsuario(user: any){
    this.user_id.set(user.id)
    this.userForm.patchValue(user);
  }

}
