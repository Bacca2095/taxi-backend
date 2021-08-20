import { ManejadorEliminarCarrera } from './../../../aplicacion/carrera/comando/eliminar-carrera.manejador';
import { ManejadorListarCarrera } from './../../../aplicacion/carrera/consulta/listar-carrera.manejador';
import { DaoCarrera } from 'src/dominio/carrera/puerto/dao/dao-carrera';
import { ManejadorRegistrarCarrera } from '../../../aplicacion/carrera/comando/registrar-carrera.manejador';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
import { ServicioRegistrarCarrera } from '../../../dominio/carrera/servicio/servicio-registrar-carrera';
import { daoCarreraProvider } from './dao/dao-carrera.proveedor';
import { repositorioCarreraProvider } from './repositorio/repositorio-carrera.proveedor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { servicioRegistrarCarreraProveedor } from './servicio/servicio-registrar-carrera.proveedor';
import { CarreraEntidad } from '../entidad/carrera.entidad';
import { ServicioEliminarCarrera } from 'src/dominio/carrera/servicio/servicio-eliminar-carrera';
import { servicioEliminarCarreraProveedor } from './servicio/servicio-eliminar-carrera.proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([CarreraEntidad])],
  providers: [
    {
      provide: ServicioRegistrarCarrera,
      inject: [RepositorioCarrera],
      useFactory: servicioRegistrarCarreraProveedor,
    },
    {
      provide: ServicioEliminarCarrera,
      inject: [RepositorioCarrera, DaoCarrera],
      useFactory: servicioEliminarCarreraProveedor,
    },
    repositorioCarreraProvider,
    daoCarreraProvider,
    ManejadorRegistrarCarrera,
    ManejadorListarCarrera,
    ManejadorEliminarCarrera,
  ],
  exports: [
    ServicioRegistrarCarrera,
    RepositorioCarrera,
    DaoCarrera,
    ManejadorRegistrarCarrera,
    ManejadorListarCarrera,
    ManejadorEliminarCarrera,
  ],
})
export class CarreraProveedorModule {}
