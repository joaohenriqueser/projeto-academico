import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from '../entities/disciplina.entity';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class DisciplinaServiceUpdate {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async update(id: number, request: DisciplinaRequest): Promise<DisciplinaResponse> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { idDisciplina: id },
    });

    if (!disciplina) {
      throw new HttpException('Disciplina não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(disciplina, request);
    const updated = await this.disciplinaRepository.save(disciplina);

    return new DisciplinaResponse(updated);
  }
}
