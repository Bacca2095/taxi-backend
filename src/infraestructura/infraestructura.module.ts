import { CarreraModule } from './carrera/carrera.module';
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from './configuracion/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfigFactory } from './configuracion/database.config';
import { NodeEnv } from './configuracion/enviroment/env-node.enum';

@Module({
  providers: [AppLogger],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
          .required(),
      }),
    }),
    CarreraModule,
  ],
})
export class InfraestructuraModule {}
