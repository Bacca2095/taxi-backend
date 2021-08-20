import { ServicioEliminarCarrera } from './../../../dominio/carrera/servicio/servicio-eliminar-carrera';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManejadorEliminarCarrera {
  constructor(private _servicioEliminarCarrera: ServicioEliminarCarrera) {}

  async ejecutar(id: number) {
    await this._servicioEliminarCarrera.ejecutar(id);
  }
}
