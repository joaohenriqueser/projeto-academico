import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ProfessorServiceCreate {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async create(request: ProfessorRequest): Promise<ProfessorResponse> {
    const existing = await this.professorRepository.findOne({
      where: { codProfessor: request.codProfessor },
    });

    if (existing) {
      throw new HttpException(
        'Código de professor já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfessor = this.professorRepository.create(request);
    const saved = await this.professorRepository.save(newProfessor);

    return new ProfessorResponse(saved);
  }
}
