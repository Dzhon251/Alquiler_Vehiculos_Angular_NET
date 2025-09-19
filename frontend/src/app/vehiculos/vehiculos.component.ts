import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VehiculosService } from '../services/vehiculos.service';
import Swal from 'sweetalert2';
import { IVehiculos } from '../interfaces/i-vehiculos';

@Component({
  selector: 'app-vehiculos.component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {

  listaVehiculos!: IVehiculos[];

  constructor(
    private vehiculosService: VehiculosService
  ) { }

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculosService.getVehiculos().subscribe((vehiculos) => {
      this.listaVehiculos = vehiculos;
    });
  }

  eliminarVehiculo(id: number) {
    Swal.fire({
      title: "Vehículos",
      text: "¿Está seguro que desea eliminar este vehículo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.vehiculosService.eliminarVehiculo(id).subscribe((id) => {
          if (id > 0) {
            this.cargarVehiculos();
            Swal.fire(
              'Vehículo Eliminado!',
              'Se ha eliminado correctamente.',
              'success'
            );
          }
        });
      }
    });
  }

}
