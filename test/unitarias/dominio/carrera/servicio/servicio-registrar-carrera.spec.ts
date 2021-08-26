import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../../utils/create-object.stub';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
import { ServicioRegistrarCarrera } from 'src/dominio/carrera/servicio/servicio-registrar-carrera';
import { Carrera } from 'src/dominio/carrera/modelo/carrera';

const sinonSandbox = createSandbox();
describe('Servicio eliminar carrera', () => {
  let repositorioCarrera: SinonStubbedInstance<RepositorioCarrera>;
  let servicioRegistrarCarrera: ServicioRegistrarCarrera;
  let spyServicioRegistrarCarrera: any;
  const _Carrera = Carrera;

  beforeAll(async () => {
    repositorioCarrera = createStubObj<RepositorioCarrera>(
      ['validarDescuentoCuartaCarrera', 'guardar'],
      sinonSandbox,
    );

    servicioRegistrarCarrera = new ServicioRegistrarCarrera(repositorioCarrera);
    spyServicioRegistrarCarrera = jest.spyOn(
      servicioRegistrarCarrera,
      'ejecutar',
    );
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('debería registrar la carrera', async () => {
    const carrera: Carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-13T15:10:33.626Z',
      '8:00',
      'calle 17',
    );

    repositorioCarrera.validarDescuentoCuartaCarrera.returns(
      Promise.resolve(false),
    );

    await servicioRegistrarCarrera.ejecutar(carrera);

    expect(spyServicioRegistrarCarrera).toBeCalled();
  });
  it('debería registrar la carrera con descuento de cuarta carrera', async () => {
    const carrera: Carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-13T15:10:33.626Z',
      '8:00',
      'calle 17',
    );

    repositorioCarrera.validarDescuentoCuartaCarrera.returns(
      Promise.resolve(true),
    );

    await servicioRegistrarCarrera.ejecutar(carrera);

    expect(spyServicioRegistrarCarrera).toBeCalled();
  });
  it('debería fallar al registrar la carrera con formato de hora incorrecto', async () => {
    const carrera: Carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-13T15:10:33.626Z',
      '8:00',
      'calle 17',
    );

    repositorioCarrera.validarDescuentoCuartaCarrera.returns(
      Promise.resolve(false),
    );

    await servicioRegistrarCarrera.ejecutar(carrera);

    expect(spyServicioRegistrarCarrera).toBeCalled();
  });
});
