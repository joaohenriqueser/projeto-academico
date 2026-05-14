import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { CidadeModule } from '../cidade/cidade.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { ProfessorModule } from '../professor/professor.module';
import { AlunoModule } from '../aluno/aluno.module';
import { DisciplinaModule } from '../disciplina/disciplina.module';
import { AvaliacaoModule } from '../avaliacao/avaliacao.module';
import { ResourcesController } from './app.resources.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(1521),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().allow('', null).default(''),
        DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
        JWT_SECRET: Joi.string().required(),
        JWT_TTL: Joi.number().default(3600),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USER: Joi.string().allow('').optional(),
        EMAIL_PASSWORD: Joi.string().allow('').optional(),
        EMAIL_FROM: Joi.string().required(),
        EMAIL_FROM_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        database: configService.get('DATABASE_DATABASE'),
        password: configService.get('DATABASE_PASSWORD'),
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
        logging: ['query', 'error'],
      }),
    }),
    CidadeModule,
    UsuarioModule,
    ProfessorModule,
    AlunoModule,
    DisciplinaModule,
    AvaliacaoModule,
    AuthModule,
  ],
  controllers: [ResourcesController],
})
export class AppModule {}
