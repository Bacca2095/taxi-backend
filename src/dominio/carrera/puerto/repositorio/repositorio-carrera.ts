import { CarreraDto } from './../../../../aplicacion/carrera/consulta/dto/carrera.dto';
import { Carrera } from './../../modelo/carrera';
export abstract class RepositorioCarrera {
  abstract validarDescuentoCuartaCarrera(documento: string): Promise<boolean>;
  abstract guardar(carrera: Carrera);
  abstract eliminar(id: number);
  abstract buscar(id: number): Promise<CarreraDto>;
}
