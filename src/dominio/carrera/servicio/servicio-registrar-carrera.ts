import { Carrera } from './../modelo/carrera';
import { RepositorioCarrera } from '../puerto/repositorio/repositorio-carrera';

export class ServicioRegistrarCarrera {
  constructor(private readonly _repositorioCarrera: RepositorioCarrera) {}
  async ejecutar(carrera: Carrera) {
    if (
      await this._repositorioCarrera.validarDescuentoCuartaCarrera(
        carrera.documento,
      )
    ) {
      carrera.aplicarDescuentoCuartaCarrera();
    }
    await this._repositorioCarrera.guardar(carrera);
  }
}
