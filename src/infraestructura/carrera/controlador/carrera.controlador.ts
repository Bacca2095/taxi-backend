import { ManejadorEliminarCarrera } from './../../../aplicacion/carrera/comando/eliminar-carrera.manejador';
import { ManejadorListarCarrera } from './../../../aplicacion/carrera/consulta/listar-carrera.manejador';
import { ComandoRegistrarCarrera } from './../../../aplicacion/carrera/comando/registrar-carrera.comando';
import { ManejadorRegistrarCarrera } from './../../../aplicacion/carrera/comando/registrar-carrera.manejador';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarreraDto } from 'src/aplicacion/carrera/consulta/dto/carrera.dto';

@Controller('carreras')
export class CarreraControlador {
  constructor(
    private readonly _manejadorRegistrarCarrera: ManejadorRegistrarCarrera,
    private readonly _manejadorListarCarrera: ManejadorListarCarrera,
    private readonly _manejadorEliminarCarrera: ManejadorEliminarCarrera,
  ) {}

  @Get(':documento')
  async listar(@Param('documento') documento: string): Promise<CarreraDto[]> {
    return this._manejadorListarCarrera.ejecutar(documento);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarCarrera: ComandoRegistrarCarrera) {
    await this._manejadorRegistrarCarrera.ejecutar(comandoRegistrarCarrera);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return this._manejadorEliminarCarrera.ejecutar(id);
  }
}
