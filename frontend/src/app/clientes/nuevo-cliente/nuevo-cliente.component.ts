import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cliente.component',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css'
})
export class NuevoClienteComponent implements OnInit {
  tituloFormulario = "Registro de nuevo cliente";
  id: number = 0;
  editar: boolean = false;

  clienteforms: FormGroup = new FormGroup({});

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private parametros: ActivatedRoute

  ) {
    this.clienteforms = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      licencia: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      
    });

    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        this.tituloFormulario = "Actualizar datos del cliente";
        this.id = parametros['parametro'];
        this.editar = true;
        this.clientesService.unCliente(this.id).subscribe((cliente) => {
          this.clienteforms.patchValue(cliente);
        });
      } else {
        this.clienteforms.reset();
      }
    });
  }

  ngOnInit(): void {

  }

  guardarCliente() {
    if (this.clienteforms.invalid) {
      console.log("Formulario inválido");
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del cliente?',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.editar == true) {
          const cliente = this.clienteforms.value;
          cliente.id = this.id;
          this.clientesService
            .putCliente(cliente)
            .subscribe((cliente) => {
              if (cliente == null) {
                Swal.fire('Clientes', 'Error al guardar', 'error');
              }
              Swal.fire('Clientes', 'Se guardo con exito', 'success');
              this.clienteforms.reset();
              this.router.navigate(['admin/clientes']);
            });
        } else {
          const cliente = this.clienteforms.value;
          this.clientesService
            .postCliente(cliente)
            .subscribe((uncliente) => {
              Swal.fire('Clientes', 'Se guardo con exito', 'success');
              this.clienteforms.reset();
              this.router.navigate(['admin/clientes']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Clientes', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
}