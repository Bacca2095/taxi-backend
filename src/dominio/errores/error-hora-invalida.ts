import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorHoraInvalida extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorHoraInvalida.name);
  }
}
