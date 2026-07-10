import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Service()
export class AuthService {
    urlBase = environment.servidor2;

    http = inject(HttpClient);

    funLoginLaravel(credenciales: any){
        return this.http.post(`${this.urlBase}/auth/v1/auth/login`, credenciales);
    }
    
    funRegister(){

    }
    funPerfil(){
        return this.http.get(`${this.urlBase}/api/v1/auth/profile`, /*{headers: {Authorization: "Bearer "+localStorage.getItem("access_token")}}*/);
    }
    funLogout(){

    }

}
