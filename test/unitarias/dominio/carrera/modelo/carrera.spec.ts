import { Carrera } from 'src/dominio/carrera/modelo/carrera';
import { CarreraTestDataBuilder } from 'test/utils/carrera-test-data-builder';

describe('Modelo usuario', () => {
  it('debería crear la carrera', () => {
    const carrera = new CarreraTestDataBuilder().build();

    const nombre = carrera.nombre === 'Test';
    const documento = carrera.documento === '123456';
    const telefono = carrera.telefono === 300000000;
    const horaRecogida = carrera.horaRecogida === '8:00';
    const direccion = carrera.direccion === 'calle 17';
    const fechaRecogida =
      carrera.fechaRecogida.toISOString() === '2021-08-13T08:00:00.626Z';

    expect(
      nombre &&
        documento &&
        telefono &&
        horaRecogida &&
        direccion &&
        fechaRecogida,
    ).toEqual(true);
  });

  it('debería validar el costo de la carrera diurna entre semana', () => {
    const carrera = new CarreraTestDataBuilder().build();
    expect(carrera.costo).toEqual(6000);
  });

  it('debería validar el costo de la carrera nocturna entre semana', () => {
    const carrera = new CarreraTestDataBuilder().withHora('21:00').build();
    expect(carrera.costo).toEqual(7500);
  });

  it('debería validar el costo de la carrera diurna el fin de semana', () => {
    const carrera = new CarreraTestDataBuilder()
      .withFecha('2021-08-14T15:10:33.626Z')
      .build();

    expect(carrera.costo).toEqual(7800);
  });

  it('debería validar el costo de la carrera nocturna el fin de semana', () => {
    const carrera = new CarreraTestDataBuilder()
      .withFecha('2021-08-14T15:10:33.626Z')
      .withHora('23:00')
      .build();
    expect(carrera.costo).toEqual(9750);
  });
  it('debería validar el costo de la carrera nocturna el fin de semana y descuento de cuarta carrera', () => {
    const carrera = new CarreraTestDataBuilder()
      .withFecha('2021-08-14T15:10:33.626Z')
      .withHora('22:00')
      .build();
    carrera.aplicarDescuentoCuartaCarrera();
    expect(carrera.costo).toEqual(7800);
  });

  it('debería validar el costo de la carrera diurna el fin de semana y descuento de cuarta carrera', () => {
    const carrera = new CarreraTestDataBuilder()
      .withFecha('2021-08-14T15:10:33.626Z')
      .build();
    carrera.aplicarDescuentoCuartaCarrera();
    expect(carrera.costo).toEqual(6240);
  });
});
