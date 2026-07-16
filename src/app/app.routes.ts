import { Routes } from '@angular/router';
import { WebLayout } from './layout/web-layout/web-layout';
import { Inicio } from './web/inicio/inicio';
import { Nosotros } from './web/nosotros/nosotros';
import { Servicios } from './web/servicios/servicios';
import { AppLayout } from './layout/app-layout/app-layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { Perfil } from './admin/perfil/perfil';
import { Users } from './admin/users/users';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DashComponent } from './admin/dash/dash.component';

export const routes: Routes = [
    {
        path: '',
        component: WebLayout,
        children: [
            { path: '', component: Inicio },
            { path: 'nosotros', component: Nosotros },
            { path: 'servicios', component: Servicios },
            { path: 'auth', loadChildren: () => import('./auth/auth-routing-module').then(m => m.AuthRoutingModule) },
        ]
    },
    {
        path: 'admin',
        component: NavigationComponent,
        children: [
            { path: '', component: DashComponent },
            { path: 'perfil', component: Perfil },
            { path: 'usuarios', component: Users },
        ]
    },
];
