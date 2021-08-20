import { DaoCarrera } from 'src/dominio/carrera/puerto/dao/dao-carrera';
import { CarreraDto } from './dto/carrera.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManejadorListarCarrera {
  constructor(private _daoCarrera: DaoCarrera) {}
  async ejecutar(documento: string): Promise<CarreraDto[]> {
    return this._daoCarrera.listar(documento);
  }
}
