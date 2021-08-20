import { CarreraControlador } from './controlador/carrera.controlador';
import { Module } from '@nestjs/common';
import { CarreraProveedorModule } from './proveedor/carrera-proveedor.module';

@Module({
  imports: [CarreraProveedorModule],
  controllers: [CarreraControlador],
})
export class CarreraModule {}
