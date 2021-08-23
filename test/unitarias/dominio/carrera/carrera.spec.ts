import { Carrera } from 'src/dominio/carrera/modelo/carrera';

describe('Modelo usuario', () => {
  const _Carrera = Carrera;

  it('debería crear la carrera', () => {
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-13T15:10:33.626Z',
      '8:00',
      'calle 17',
    );

    const nombre = carrera.nombre === 'Cesar';
    const documento = carrera.documento === '1091674713';
    const telefono = carrera.telefono === 3182990138;
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
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-13T15:10:33.626Z',
      '8:00',
      'calle 17',
    );
    expect(carrera.costo).toEqual(6000);
  });

  it('debería validar el costo de la carrera nocturna entre semana', () => {
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-13T15:10:33.626Z',
      '21:00',
      'calle 17',
    );
    expect(carrera.costo).toEqual(7500);
  });

  it('debería validar el costo de la carrera diurna el fin de semana', () => {
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-14T15:10:33.626Z',
      '8:00',
      'calle 17',
    );
    expect(carrera.costo).toEqual(7800);
  });

  it('debería validar el costo de la carrera nocturna el fin de semana', () => {
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-14T15:10:33.626Z',
      '23:00',
      'calle 17',
    );
    expect(carrera.costo).toEqual(9750);
  });

  it('debería validar el costo de la carrera nocturna el fin de semana y descuento de cuarta carrera', () => {
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-14T15:10:33.626Z',
      '22:00',
      'calle 17',
    );
    carrera.aplicarDescuentoCuartaCarrera();
    expect(carrera.costo).toEqual(7800);
  });

  it('debería validar el costo de la carrera diurna el fin de semana y descuento de cuarta carrera', () => {
    const carrera = new _Carrera(
      'Cesar',
      '1091674713',
      3182990138,
      '2021-08-14T15:10:33.626Z',
      '8:00',
      'calle 17',
    );
    carrera.aplicarDescuentoCuartaCarrera();
    expect(carrera.costo).toEqual(6240);
  });
});
