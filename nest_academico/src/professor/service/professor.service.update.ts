import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ProfessorServiceUpdate {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async update(id: number, request: ProfessorRequest): Promise<ProfessorResponse> {
    const professor = await this.professorRepository.findOne({
      where: { idProfessor: id },
    });

    if (!professor) {
      throw new HttpException('Professor não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(professor, request);
    const updated = await this.professorRepository.save(professor);

    return new ProfessorResponse(updated);
  }
}
