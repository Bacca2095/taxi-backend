import { ErrorEliminarCarrera } from './../../errores/error-eliminar-carrera';
import { RepositorioCarrera } from '../puerto/repositorio/repositorio-carrera';

export class ServicioEliminarCarrera {
  constructor(private readonly _repositorioCarrera: RepositorioCarrera) {}

  async ejecutar(id: number) {
    const carrera = await this._repositorioCarrera.buscar(id);

    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getHours() - 5);

    let diferenciaTiempo =
      (carrera.fechaRecogida.getTime() - fechaActual.getTime()) / 1000;
    diferenciaTiempo /= 60;

    diferenciaTiempo = Math.round(diferenciaTiempo);

    if (diferenciaTiempo > 29) {
      await this._repositorioCarrera.eliminar(id);
    } else {
      throw new ErrorEliminarCarrera(
        'No puede eliminar la carrera porque esta en proceso o ya se realizo',
      );
    }
  }
}
