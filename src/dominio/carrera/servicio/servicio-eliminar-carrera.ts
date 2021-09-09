import { ErrorEliminarCarrera } from './../../errores/error-eliminar-carrera';
import { RepositorioCarrera } from '../puerto/repositorio/repositorio-carrera';

export class ServicioEliminarCarrera {
  constructor(private readonly _repositorioCarrera: RepositorioCarrera) {}

  async ejecutar(id: number) {
    const carrera = await this._repositorioCarrera.buscar(id);
    const hourToMinutes = 60;
    const secondToMilli = 1000;
    const minutesMinToDelete = 29;

    const fechaActual = new Date();
    fechaActual.setHours(
      fechaActual.getHours() - fechaActual.getTimezoneOffset() / hourToMinutes,
    );

    let diferenciaTiempo =
      (carrera.fechaRecogida.getTime() - fechaActual.getTime()) / secondToMilli;
    diferenciaTiempo /= hourToMinutes;

    diferenciaTiempo = Math.ceil(diferenciaTiempo);

    if (diferenciaTiempo > minutesMinToDelete) {
      await this._repositorioCarrera.eliminar(id);
    } else {
      throw new ErrorEliminarCarrera(
        'No puede eliminar la carrera porque esta en proceso o ya se realizo',
      );
    }
  }
}
