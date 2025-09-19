import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IAlquiler } from '../interfaces/i-alquiler';
import { AlquilerService } from '../services/alquiler.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alquiler.component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {
 listaAlquileres!: IAlquiler[];

  constructor(
    private alquilerService: AlquilerService
  ) { }

  ngOnInit() {
    this.cargarAlquileres();
  }

  cargarAlquileres() {
    this.alquilerService.getAlquileres().subscribe((alquileres) => {
      this.listaAlquileres = alquileres;
    });
  }

  eliminarAlquiler(id: number) {
  Swal.fire({
    title: "Alquileres",
    text: "¿Está seguro que desea eliminar este registro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.alquilerService.eliminarAlquiler(id).subscribe(() => {
        this.cargarAlquileres();
        Swal.fire(
          'Registro Eliminado!',
          'El alquiler fue eliminado exitosamente.',
          'success'
        );
      });
    }
  });
}


}