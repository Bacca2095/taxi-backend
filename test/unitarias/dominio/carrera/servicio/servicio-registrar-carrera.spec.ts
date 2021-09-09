import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../../utils/create-object.stub';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
import { ServicioRegistrarCarrera } from 'src/dominio/carrera/servicio/servicio-registrar-carrera';
import { CarreraTestDataBuilder } from 'test/utils/carrera-test-data-builder';

const sinonSandbox = createSandbox();
describe('Servicio registrar carrera', () => {
  let repositorioCarrera: SinonStubbedInstance<RepositorioCarrera>;
  let servicioRegistrarCarrera: ServicioRegistrarCarrera;

  beforeAll(async () => {
    repositorioCarrera = createStubObj<RepositorioCarrera>(
      ['validarDescuentoCuartaCarrera', 'guardar'],
      sinonSandbox,
    );

    servicioRegistrarCarrera = new ServicioRegistrarCarrera(repositorioCarrera);
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('debería registrar la carrera', async () => {
    const carrera = new CarreraTestDataBuilder().build();

    repositorioCarrera.validarDescuentoCuartaCarrera.returns(
      Promise.resolve(false),
    );

    await expect(servicioRegistrarCarrera.ejecutar(carrera)).resolves;
  });
  it('debería registrar la carrera con descuento de cuarta carrera', async () => {
    const carrera = new CarreraTestDataBuilder().build();

    repositorioCarrera.validarDescuentoCuartaCarrera.returns(
      Promise.resolve(true),
    );

    await expect(servicioRegistrarCarrera.ejecutar(carrera)).resolves;
  });
});
