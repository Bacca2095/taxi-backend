import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoCarrera } from 'src/dominio/carrera/puerto/dao/dao-carrera';
import { CarreraDto } from 'src/aplicacion/carrera/consulta/dto/carrera.dto';

@Injectable()
export class DaoCarreraMysql implements DaoCarrera {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async listar(documento: string): Promise<CarreraDto[]> {
    return this.entityManager.query(
      `SELECT * FROM carrera WHERE documento = ${documento}`,
    );
  }
}
