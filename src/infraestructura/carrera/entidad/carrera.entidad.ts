import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'carrera' })
export class CarreraEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  documento: string;

  @Column()
  telefono: number;

  @Column()
  fechaRecogida: Date;

  @Column()
  horaRecogida: string;

  @Column()
  direccion: string;

  @Column()
  costo: number;
}
