import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ProfessorServiceRemove {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async remove(id: number): Promise<boolean> {
    const professor = await this.professorRepository.findOne({
      where: { idProfessor: id },
    });

    if (!professor) {
      throw new HttpException('Professor não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.professorRepository.remove(professor);
    return true;
  }
}
