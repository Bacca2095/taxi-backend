import { ServicioRegistrarCarrera } from './../../../../dominio/carrera/servicio/servicio-registrar-carrera';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';

export function servicioRegistrarCarreraProveedor(
  repositorioCarrera: RepositorioCarrera,
) {
  return new ServicioRegistrarCarrera(repositorioCarrera);
}
