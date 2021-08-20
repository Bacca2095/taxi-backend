import { CarreraDto } from 'src/aplicacion/carrera/consulta/dto/carrera.dto';

export abstract class DaoCarrera {
  abstract listar(documento: string): Promise<CarreraDto[]>;
}
