import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { NuevoClienteComponent } from './clientes/nuevo-cliente/nuevo-cliente.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { HomeComponent } from './home/home.component';
import { NuevoVehiculoComponent } from './vehiculos/nuevo-vehiculo/nuevo-vehiculo.component';
import { NuevoAlquilerComponent } from './alquiler/nuevo-alquiler/nuevo-alquiler.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path: 'admin',
        children: [
            {
                path: 'clientes',
                component: ClientesComponent
            },
            {
                path: 'vehiculos',
                component: VehiculosComponent
            },
            {
                path: 'alquiler',
                component: AlquilerComponent
            }
        ]
    },
    {
        path: 'nuevo-cliente',
        component: NuevoClienteComponent,
        pathMatch: "full"
    },
    {
        path: 'editar-cliente/:parametro',
        component: NuevoClienteComponent,
        pathMatch: "full"
    },

    {
        path: 'nuevo-vehiculo',
        component: NuevoVehiculoComponent,
        pathMatch: "full"
    },
    {
        path: 'editar-vehiculo/:parametro',
        component: NuevoVehiculoComponent,
        pathMatch: "full"
    },

    {
        path: 'nuevo-alquiler',
        component: NuevoAlquilerComponent,
        pathMatch: "full"
    },
    {
        path: 'editar-alquiler/:parametro',
        component: NuevoAlquilerComponent,
        pathMatch: "full"
    },

];
