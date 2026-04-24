import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from '../entities/disciplina.entity';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class DisciplinaServiceCreate {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async create(request: DisciplinaRequest): Promise<DisciplinaResponse> {
    const existing = await this.disciplinaRepository.findOne({
      where: { nomeDisciplina: request.nomeDisciplina },
    });

    if (existing) {
      throw new HttpException(
        'Disciplina já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newDisciplina = this.disciplinaRepository.create(request);
    const saved = await this.disciplinaRepository.save(newDisciplina);

    return new DisciplinaResponse(saved);
  }
}
