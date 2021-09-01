import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigracionCarrera1628634904229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE carrera (
        id int NOT NULL AUTO_INCREMENT,
        nombre varchar(255) NOT NULL,
        documento varchar(255) NOT NULL,
        telefono varchar(255) NOT NULL,
        fechaRecogida datetime NOT NULL,
        horaRecogida varchar(255) NOT NULL,
        direccion varchar(255) NOT NULL,
        costo int NOT NULL,
        PRIMARY KEY (id)) ENGINE=InnoDB`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE carrera', undefined);
  }
}
