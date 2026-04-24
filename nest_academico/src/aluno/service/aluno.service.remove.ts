import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceRemove {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async remove(id: number): Promise<void> {
    const aluno = await this.alunoRepository.findOne({
      where: { idAluno: id },
    });

    if (!aluno) {
      throw new HttpException('Aluno não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.alunoRepository.remove(aluno);
  }
}
