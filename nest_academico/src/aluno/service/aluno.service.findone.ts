import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';
import { AlunoResponse } from '../dto/response/aluno.response';

@Injectable()
export class AlunoServiceFindOne {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async findOne(id: number): Promise<AlunoResponse> {
    const aluno = await this.alunoRepository.findOne({
      where: { idAluno: id },
    });

    if (!aluno) {
      throw new HttpException('Aluno não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new AlunoResponse(aluno);
  }
}
