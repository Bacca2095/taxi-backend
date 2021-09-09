import { ComandoRegistrarCarrera } from './../../../../src/aplicacion/carrera/comando/registrar-carrera.comando';
import { ServicioEliminarCarrera } from 'src/dominio/carrera/servicio/servicio-eliminar-carrera';
import { ManejadorEliminarCarrera } from './../../../../src/aplicacion/carrera/comando/eliminar-carrera.manejador';
import { ManejadorListarCarrera } from '../../../../src/aplicacion/carrera/consulta/listar-carrera.manejador';
import { ManejadorRegistrarCarrera } from '../../../../src/aplicacion/carrera/comando/registrar-carrera.manejador';
import { ServicioRegistrarCarrera } from '../../../../src/dominio/carrera/servicio/servicio-registrar-carrera';
import { CarreraControlador } from '../../../../src/infraestructura/carrera/controlador/carrera.controlador';
import { DaoCarrera } from 'src/dominio/carrera/puerto/dao/dao-carrera';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../utils/create-object.stub';
import { servicioEliminarCarreraProveedor } from 'src/infraestructura/carrera/proveedor/servicio/servicio-eliminar-carrera.proveedor';
import { servicioRegistrarCarreraProveedor } from 'src/infraestructura/carrera/proveedor/servicio/servicio-registrar-carrera.proveedor';
import { CarreraTestDataBuilder } from 'test/utils/carrera-test-data-builder';
import { ComandoRegistrarCarreraTestDataBuilder } from 'test/utils/comando-registrar-carrera-test-data-builder';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de carreras', () => {
  let app: INestApplication;
  let repositorioCarrera: SinonStubbedInstance<RepositorioCarrera>;
  let daoCarrera: SinonStubbedInstance<DaoCarrera>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioCarrera = createStubObj<RepositorioCarrera>(
      ['validarDescuentoCuartaCarrera', 'guardar', 'eliminar', 'buscar'],
      sinonSandbox,
    );
    daoCarrera = createStubObj<DaoCarrera>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [CarreraControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarCarrera,
          inject: [RepositorioCarrera],
          useFactory: servicioRegistrarCarreraProveedor,
        },
        {
          provide: ServicioEliminarCarrera,
          inject: [RepositorioCarrera],
          useFactory: servicioEliminarCarreraProveedor,
        },

        { provide: RepositorioCarrera, useValue: repositorioCarrera },
        { provide: DaoCarrera, useValue: daoCarrera },
        ManejadorRegistrarCarrera,
        ManejadorListarCarrera,
        ManejadorEliminarCarrera,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar las carreras registradas', async () => {
    const carreras: any[] = [new CarreraTestDataBuilder().build()];
    daoCarrera.listar.returns(Promise.resolve(carreras));
    const response = await request(app.getHttpServer())
      .get('/carreras/1091674713')
      .expect(HttpStatus.OK);

    expect(response.body).toEqual(carreras);
  });
  it('debería registrar la carrera', async () => {
    const carrera: ComandoRegistrarCarrera =
      new ComandoRegistrarCarreraTestDataBuilder().build();
    await request(app.getHttpServer())
      .post('/carreras')
      .send(carrera)
      .expect(HttpStatus.CREATED);
  });
  it('debería registrar la carrera con descuento de cuarta carrera', async () => {
    const carrera: ComandoRegistrarCarrera =
      new ComandoRegistrarCarreraTestDataBuilder().build();

    repositorioCarrera.validarDescuentoCuartaCarrera.returns(
      Promise.resolve(true),
    );

    await request(app.getHttpServer())
      .post('/carreras')
      .send(carrera)
      .expect(HttpStatus.CREATED);
  });

  it('debería eliminar una carrera con un dia de diferencia mayor a la actual', async () => {
    const fechaActual = new Date();
    const fechaRecogida = new Date();
    fechaRecogida.setDate(fechaRecogida.getDate() + 1);
    const carrera = new CarreraTestDataBuilder()
      .withFecha(fechaRecogida.toISOString())
      .withHora(fechaActual.getHours() + ':' + fechaActual.getMinutes())
      .build();
    repositorioCarrera.buscar.returns(Promise.resolve(carrera));
    await request(app.getHttpServer())
      .delete('/carreras/1')
      .expect(HttpStatus.OK);
  });
  it('debería eliminar una carrera con media hora de diferencia a la hora actual', async () => {
    const fechaActual = new Date();
    const fechaRecogida = fechaActual;

    fechaRecogida.setMinutes(fechaRecogida.getMinutes() + 30);

    const carrera = new CarreraTestDataBuilder()
      .withFecha(fechaRecogida.toISOString())
      .withHora(fechaActual.getHours() + ':' + fechaActual.getMinutes())
      .build();

    repositorioCarrera.buscar.returns(Promise.resolve(carrera));
    await request(app.getHttpServer())
      .delete('/carreras/1')
      .expect(HttpStatus.OK);
  });
  it('debería fallar al eliminar una carrera con menos de media hora de diferencia a la hora actual', async () => {
    const fechaActual = new Date();
    const fechaRecogida = new Date();
    fechaRecogida.setHours(
      fechaRecogida.getHours() - fechaRecogida.getTimezoneOffset() / 60,
    );
    fechaRecogida.setMinutes(fechaRecogida.getMinutes() + 29);

    const carrera = new CarreraTestDataBuilder()
      .withFecha(fechaRecogida.toISOString())
      .withHora(fechaActual.getHours() + ':' + fechaActual.getMinutes())
      .build();
    repositorioCarrera.buscar.returns(Promise.resolve(carrera));

    await request(app.getHttpServer())
      .delete('/carreras/1')
      .expect(HttpStatus.BAD_REQUEST);
  });
});
