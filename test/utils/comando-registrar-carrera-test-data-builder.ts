import { ComandoRegistrarCarrera } from 'src/aplicacion/carrera/comando/registrar-carrera.comando';

export class ComandoRegistrarCarreraTestDataBuilder {
  #nombre: string;
  #documento: string;
  #telefono: number;
  #fechaRecogida: string;
  #horaRecogida: string;
  #direccion: string;

  constructor() {
    this.#nombre = 'Test';
    this.#documento = '123456';
    this.#telefono = 300000000;
    this.#fechaRecogida = '2021-08-13T08:00:00.626Z';
    this.#horaRecogida = '8:00';
    this.#direccion = 'calle 17';
  }

  withHora(hora: string) {
    this.#horaRecogida = hora;
    return this;
  }

  withFecha(fecha: string) {
    this.#fechaRecogida = fecha;
    return this;
  }

  build(): ComandoRegistrarCarrera {
    return {
      nombre: this.#nombre,
      documento: this.#documento,
      telefono: this.#telefono,
      fechaRecogida: this.#fechaRecogida,
      horaRecogida: this.#horaRecogida,
      direccion: this.#direccion,
    };
  }
}
