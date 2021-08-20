import { ApiProperty } from '@nestjs/swagger';

export class CarreraDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Cesar' })
  nombre: string;

  @ApiProperty({ example: '123456789' })
  documento: string;

  @ApiProperty({ example: 1 })
  telefono: number;

  @ApiProperty({ example: new Date().toISOString() })
  fechaRecogida: Date;

  @ApiProperty({ example: '8:00' })
  horaRecogida: string;

  @ApiProperty({ example: 'Calle xy #xy-xy barrio z' })
  direccion: string;

  @ApiProperty({ example: 7000 })
  costo: number;
}
