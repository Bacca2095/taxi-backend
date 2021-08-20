import { DaoCarreraMysql } from './../../adaptador/dao/dao-carrera-mysql';
import { DaoCarrera } from 'src/dominio/carrera/puerto/dao/dao-carrera';

export const daoCarreraProvider = {
  provide: DaoCarrera,
  useClass: DaoCarreraMysql,
};
