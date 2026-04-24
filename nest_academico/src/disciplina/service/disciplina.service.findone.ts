import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from '../entities/disciplina.entity';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class DisciplinaServiceFindOne {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async findOne(id: number): Promise<DisciplinaResponse> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { idDisciplina: id },
    });

    if (!disciplina) {
      throw new HttpException('Disciplina não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new DisciplinaResponse(disciplina);
  }
}
