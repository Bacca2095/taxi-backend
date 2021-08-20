import { ServicioEliminarCarrera } from './../../../../dominio/carrera/servicio/servicio-eliminar-carrera';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';

export function servicioEliminarCarreraProveedor(
  repositorioCarrera: RepositorioCarrera,
) {
  return new ServicioEliminarCarrera(repositorioCarrera);
}
