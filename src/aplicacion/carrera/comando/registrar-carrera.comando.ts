import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ComandoRegistrarCarrera {
  @IsString()
  @ApiProperty({ example: 'Cesar' })
  public nombre: string;

  @IsString()
  @ApiProperty({ example: '123456789' })
  public documento: string;

  @IsInt()
  @ApiProperty({ example: 1 })
  public telefono: number;

  @IsString()
  @ApiProperty({ example: new Date().toISOString() })
  public fechaRecogida: string;

  @IsString()
  @ApiProperty({ example: '8:00' })
  public horaRecogida: string;

  @IsString()
  @ApiProperty({ example: 'Calle xy #xy-xy barrio z' })
  public direccion: string;
}
