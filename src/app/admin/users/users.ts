import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  quantity: number;
}

@Component({
  selector: 'app-users',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit{
  
  usuarios = signal<any>([]);
  userService = inject(UserService);
  user_id = signal<any>(-1)
  errors = signal<any>({})

  displayedColumns: string[] = ['name', 'email', 'roles', 'acciones'];



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
    if(this.user_id() > 0){
      this.userService.funModificar(this.user_id(), this.userForm.value).subscribe({
        next: (res) => {
          this.funObtenerUsuarios();
          this.user_id.set(-1);
          this.userForm.reset();
        },
        error: (error) => {
          console.log(error)

        }
      })

    }else{
      this.userService.funGuardar(this.userForm.value).subscribe({
        next: (res) => {
          this.funObtenerUsuarios();
          this.userForm.reset();
        },
        error: (error) => {
          console.log(error)
          this.errors.set(error.error)

        }
      })

    }
  }

  funEditarUsuario(user: any){
    this.user_id.set(user.id)
    this.userForm.patchValue(user);
  }

}
