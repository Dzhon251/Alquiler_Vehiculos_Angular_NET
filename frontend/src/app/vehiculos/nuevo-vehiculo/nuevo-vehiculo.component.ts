import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehiculosService } from '../../services/vehiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-vehiculo.component',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './nuevo-vehiculo.component.html',
  styleUrl: './nuevo-vehiculo.component.css'
})
export class NuevoVehiculoComponent implements OnInit {
  tituloFormulario = "Registro de nuevo vehículo";
  id: number = 0;
  editar: boolean = false;

  vehiculoForms: FormGroup = new FormGroup({});

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router,
    private parametros: ActivatedRoute
  ) {
    this.vehiculoForms = new FormGroup({
      marca: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      modelo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      anio: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      disponible: new FormControl('', [
        Validators.required,
      ]),
    });

    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        this.tituloFormulario = "Actualizar datos del vehículo";
        this.id = parametros['parametro'];
        this.editar = true;
        this.vehiculosService.unVehiculo(this.id).subscribe((vehiculo) => {
          this.vehiculoForms.patchValue(vehiculo);
        });
      } else {
        this.vehiculoForms.reset();
      }
    });
  }

  ngOnInit(): void { }

  guardarVehiculo() {
    if (this.vehiculoForms.invalid) {
      console.log("Formulario inválido");
      return;
    }
    Swal.fire({
      title: 'Desea guardar la información del vehículo?',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.editar == true) {
          const vehiculo = this.vehiculoForms.value;
          vehiculo.id = this.id;
          this.vehiculosService
            .putVehiculo(vehiculo)
            .subscribe((vehiculo) => {
              if (vehiculo == null) {
                Swal.fire('Vehículos', 'Error al guardar', 'error');
              }
              Swal.fire('Vehículos', 'Se guardó con éxito', 'success');
              this.vehiculoForms.reset();
              this.router.navigate(['/vehiculos']);
            });
        } else {
          const vehiculo = this.vehiculoForms.value;
          this.vehiculosService
            .postVehiculo(vehiculo)
            .subscribe((unVehiculo) => {
              Swal.fire('Vehículos', 'Se guardó con éxito', 'success');
              this.vehiculoForms.reset();
              this.router.navigate(['admin/vehiculos']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Vehículos', 'El usuario canceló la operación', 'info');
      }
    });
  }
}