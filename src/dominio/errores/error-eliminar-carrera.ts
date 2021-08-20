import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorEliminarCarrera extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorEliminarCarrera.name);
  }
}
