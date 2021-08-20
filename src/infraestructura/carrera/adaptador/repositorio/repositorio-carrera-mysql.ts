import { CarreraDto } from './../../../../aplicacion/carrera/consulta/dto/carrera.dto';
import { Carrera } from './../../../../dominio/carrera/modelo/carrera';
import { CarreraEntidad } from './../../entidad/carrera.entidad';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RepositorioCarrera } from 'src/dominio/carrera/puerto/repositorio/repositorio-carrera';
@Injectable()
export class RepositorioCarreraMysql implements RepositorioCarrera {
  constructor(
    @InjectRepository(CarreraEntidad)
    private readonly repositorio: Repository<CarreraEntidad>,
  ) {}

  async validarDescuentoCuartaCarrera(documento: string): Promise<boolean> {
    const minServicesToDiscount = 3;
    return (
      (await this.repositorio.count({
        where: {
          documento,
          fechaRecogida: Like(`${new Date().toISOString().split('T')[0]}%`),
        },
      })) === minServicesToDiscount
    );
  }

  async guardar(carrera: Carrera) {
    const entidad = new CarreraEntidad();
    entidad.nombre = carrera.nombre;
    entidad.documento = carrera.documento;
    entidad.direccion = carrera.direccion;
    entidad.costo = carrera.costo;
    entidad.fechaRecogida = carrera.fechaRecogida;
    entidad.horaRecogida = carrera.horaRecogida;
    entidad.telefono = carrera.telefono;
    await this.repositorio.save(entidad);
  }

  async eliminar(id: number) {
    await this.repositorio.delete(id);
  }

  async buscar(id: number): Promise<CarreraDto> {
    return this.repositorio.findOne(id);
  }
}
