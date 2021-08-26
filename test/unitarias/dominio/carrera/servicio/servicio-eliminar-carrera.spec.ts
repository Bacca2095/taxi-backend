import { ServicioEliminarCarrera } from 'src/dominio/carrera/servicio/servicio-eliminar-carrera';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../../utils/create-object.stub';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
import { ErrorEliminarCarrera } from 'src/dominio/errores/error-eliminar-carrera';
import { CarreraTestDataBuilder } from 'test/utils/carrera-test-data-builder';

const sinonSandbox = createSandbox();
describe('Servicio eliminar carrera', () => {
  let repositorioCarrera: SinonStubbedInstance<RepositorioCarrera>;
  let servicioEliminarCarrera: ServicioEliminarCarrera;

  beforeAll(async () => {
    repositorioCarrera = createStubObj<RepositorioCarrera>(
      ['eliminar', 'buscar'],
      sinonSandbox,
    );

    servicioEliminarCarrera = new ServicioEliminarCarrera(repositorioCarrera);
  });

  afterEach(() => {
    sinonSandbox.restore();
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

    await expect(servicioEliminarCarrera.ejecutar(1)).resolves;
  });

  it('debería eliminar una carrera con media hora de diferencia a la hora actual', async () => {
    const fechaActual = new Date();
    const fechaRecogida = fechaActual;
    fechaRecogida.setHours(
      fechaRecogida.getHours() - fechaRecogida.getTimezoneOffset() / 60,
    );

    const carrera = new CarreraTestDataBuilder()
      .withFecha(fechaRecogida.toISOString())
      .withHora(fechaActual.getHours() + ':' + fechaActual.getMinutes())
      .build();

    repositorioCarrera.buscar.returns(Promise.resolve(carrera));

    await expect(servicioEliminarCarrera.ejecutar(1)).resolves;
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

    await expect(servicioEliminarCarrera.ejecutar(1)).rejects.toThrowError(
      ErrorEliminarCarrera,
    );
  });
});
