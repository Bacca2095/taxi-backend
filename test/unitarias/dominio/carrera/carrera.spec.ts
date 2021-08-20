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

    expect(carrera.nombre).toEqual('Cesar');
    expect(carrera.documento).toEqual('1091674713');
    expect(carrera.telefono).toEqual(3182990138);
    expect(carrera.horaRecogida).toEqual('8:00');
    expect(carrera.direccion).toEqual('calle 17');
    expect(carrera.fechaRecogida).toEqual(new Date('2021-08-13T08:00:00.626Z'));
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
      '16:00',
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
      '16:00',
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
      '16:00',
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
