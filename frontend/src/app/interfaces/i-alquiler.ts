export interface IAlquiler {
  id: number;
  fechaAlquiler: string;
  codigo_Alquiler: string;
  clienteModelId: number;
  clientesModel: ICliente;
  vehiculoModelId: number;
  vehiculoModel: IVehiculo;
}

export interface ICliente {
  id: number;
  nombre: string;
  apellido: string;
  licencia: string;
  telefono: string;
}

export interface IVehiculo {
  id: number;
  marca: string;
  modelo: string;
  anio: string;
  disponible: string;
}
