import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICliente } from '../interfaces/i-cliente';
import { ClientesService } from '../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes.component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  listaClientes!: ICliente[];

  constructor(
    private clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: "Clientes",
      text: "¿Está seguro que desea eliminar este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.clientesService.eliminarCliente(id).subscribe((id) => {
          if (id > 0) {
            this.cargarClientes();
            Swal.fire(
              'Cliente Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }

}
