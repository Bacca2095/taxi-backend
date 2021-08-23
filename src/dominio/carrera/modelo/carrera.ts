import { ErrorHoraInvalida } from './../../errores/error-hora-invalida';
const COSTO_BASE_DIURNO = 6000;
const COSTO_BASE_NOCTURNO = 7500;
const PORCENTAJE_ADICIONAL_FIN_DE_SEMANA = 0.3;
const PORCENTAJE_DESCUENTO_CUARTA_CARRERA = 0.2;
const HORA_INICIO_DIA = 0;
const HORA_FIN_DIA = 23;
const HORA_A_MINUTOS = 60;
const HORA_INICIAL_DIURNO = 6;
const HORA_FINAL_DIURNO = 21;

export class Carrera {
  readonly #nombre: string;
  readonly #documento: string;
  readonly #telefono: number;
  readonly #fechaRecogida: Date;
  readonly #horaRecogida: string;
  readonly #direccion: string;
  #costo: number;

  constructor(
    nombre: string,
    documento: string,
    telefono: number,
    fechaRecogida: string,
    horaRecogida: string,
    direccion: string,
  ) {
    let costoInicial = this.validarJornadaDiurnaNocturna(horaRecogida);
    let fechaHoraRecogida = new Date(fechaRecogida);

    fechaHoraRecogida.setHours(
      +horaRecogida.split(':')[0] -
        fechaHoraRecogida.getTimezoneOffset() / HORA_A_MINUTOS,
      +horaRecogida.split(':')[1],
      0,
    );

    costoInicial += this.validarSabadoDomingo(fechaHoraRecogida) * costoInicial;
    this.#nombre = nombre;
    this.#documento = documento;
    this.#telefono = telefono;
    this.#fechaRecogida = fechaHoraRecogida;
    this.#horaRecogida = horaRecogida;
    this.#direccion = direccion;
    this.#costo = costoInicial;
  }

  private validarJornadaDiurnaNocturna(hora: string) {
    if (
      +hora.split(':')[0] >= HORA_INICIO_DIA &&
      +hora.split(':')[0] <= HORA_FIN_DIA
    ) {
      if (
        +hora.split(':')[0] >= HORA_INICIAL_DIURNO &&
        +hora.split(':')[0] < HORA_FINAL_DIURNO
      ) {
        return COSTO_BASE_DIURNO;
      } else {
        return COSTO_BASE_NOCTURNO;
      }
    } else {
      throw new ErrorHoraInvalida('La hora debe estar en formato de 24 horas');
    }
  }

  private validarSabadoDomingo(fecha: Date) {
    if (fecha.toString().includes('Sat') || fecha.toString().includes('Sun')) {
      return PORCENTAJE_ADICIONAL_FIN_DE_SEMANA;
    } else {
      return 0;
    }
  }

  public aplicarDescuentoCuartaCarrera() {
    this.#costo -= this.#costo * PORCENTAJE_DESCUENTO_CUARTA_CARRERA;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get documento(): string {
    return this.#documento;
  }
  get telefono(): number {
    return this.#telefono;
  }

  get fechaRecogida(): Date {
    return this.#fechaRecogida;
  }

  get horaRecogida(): string {
    return this.#horaRecogida;
  }

  get direccion(): string {
    return this.#direccion;
  }

  get costo(): number {
    return this.#costo;
  }
}
