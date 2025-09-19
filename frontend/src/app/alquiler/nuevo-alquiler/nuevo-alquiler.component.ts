import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { VehiculosService } from '../../services/vehiculos.service';
import Swal from 'sweetalert2';
import { AlquilerService } from '../../services/alquiler.service';

@Component({
  selector: 'app-nuevo-alquiler.component',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgIf, NgForOf],
  templateUrl: './nuevo-alquiler.component.html',
  styleUrl: './nuevo-alquiler.component.css'
})
export class NuevoAlquilerComponent implements OnInit {
  tituloFormulario = "Registro de nuevo alquiler";
  id: number = 0;
  editar: boolean = false;
  listaClientes: any[] = [];
  listaVehiculos: any[] = [];

  alquilerForm: FormGroup = new FormGroup({});

  constructor(
    private alquilerService: AlquilerService,
    private clientesService: ClientesService,
    private vehiculosService: VehiculosService,
    private router: Router,
    private parametros: ActivatedRoute
  ) {
    this.alquilerForm = new FormGroup({
      fechaAlquiler: new FormControl('', [Validators.required]),
      codigo_Alquiler: new FormControl('', [Validators.required, Validators.minLength(3)]),
      clienteModelId: new FormControl('', [Validators.required]),
      vehiculoModelId: new FormControl('', [Validators.required])
    });

    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        this.tituloFormulario = "Actualizar datos del alquiler";
        this.id = parametros['parametro'];
        this.editar = true;
        this.alquilerService.unAlquiler(this.id).subscribe((alquiler) => {
          this.alquilerForm.patchValue(alquiler);
        });
      } else {
        this.alquilerForm.reset();
      }
    });
  }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((clientes) => this.listaClientes = clientes);
    this.vehiculosService.getVehiculos().subscribe((vehiculos) => this.listaVehiculos = vehiculos);
  }

  guardarAlquiler() {
    if (this.alquilerForm.invalid) {
      console.log("Formulario inválido");
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del alquiler?',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.editar) {
          const alquiler = this.alquilerForm.value;
          alquiler.id = this.id;
          this.alquilerService.putAlquiler(alquiler).subscribe((res) => {
            if (!res) Swal.fire('Alquileres', 'Error al guardar', 'error');
            Swal.fire('Alquileres', 'Se guardo con exito', 'success');
            this.alquilerForm.reset();
            this.router.navigate(['admin/alquiler']);
          });
        } else {
          const alquiler = this.alquilerForm.value;
          this.alquilerService.postAlquiler(alquiler).subscribe(() => {
            Swal.fire('Alquileres', 'Se guardo con exito', 'success');
            this.alquilerForm.reset();
            this.router.navigate(['admin/alquiler']);
          });
        }
      } else if (result.isDenied) {
        Swal.fire('Alquileres', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
}
