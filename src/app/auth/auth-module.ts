import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [Login, Register],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MatButtonModule],
})
export class AuthModule {}
