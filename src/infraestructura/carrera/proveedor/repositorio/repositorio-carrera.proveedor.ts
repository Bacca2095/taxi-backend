import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
import { RepositorioCarreraMysql } from '../../adaptador/repositorio/repositorio-carrera-mysql';

export const repositorioCarreraProvider = {
  provide: RepositorioCarrera,
  useClass: RepositorioCarreraMysql,
};
