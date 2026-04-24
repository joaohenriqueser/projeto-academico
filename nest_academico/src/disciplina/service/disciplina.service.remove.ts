import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from '../entities/disciplina.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class DisciplinaServiceRemove {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async remove(id: number): Promise<boolean> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { idDisciplina: id },
    });

    if (!disciplina) {
      throw new HttpException('Disciplina não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.disciplinaRepository.remove(disciplina);
    return true;
  }
}
