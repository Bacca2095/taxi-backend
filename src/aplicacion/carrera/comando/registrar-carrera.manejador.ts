import { ComandoRegistrarCarrera } from './registrar-carrera.comando';
import { ServicioRegistrarCarrera } from './../../../dominio/carrera/servicio/servicio-registrar-carrera';
import { Injectable } from '@nestjs/common';
import { Carrera } from 'src/dominio/carrera/modelo/carrera';

@Injectable()
export class ManejadorRegistrarCarrera {
  constructor(private _servicioRegistrarCarrera: ServicioRegistrarCarrera) {}

  async ejecutar(comandoRegistrarCarrera: ComandoRegistrarCarrera) {
    const _carrera = new Carrera(
      comandoRegistrarCarrera.nombre,
      comandoRegistrarCarrera.documento,
      comandoRegistrarCarrera.telefono,
      comandoRegistrarCarrera.fechaRecogida,
      comandoRegistrarCarrera.horaRecogida,
      comandoRegistrarCarrera.direccion,
    );

    await this._servicioRegistrarCarrera.ejecutar(_carrera);
  }
}
