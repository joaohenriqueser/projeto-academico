import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';
import { ProfessorResponse } from '../dto/response/professor.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ProfessorServiceFindOne {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async findOne(id: number): Promise<ProfessorResponse> {
    const professor = await this.professorRepository.findOne({
      where: { idProfessor: id },
    });

    if (!professor) {
      throw new HttpException('Professor não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new ProfessorResponse(professor);
  }
}
