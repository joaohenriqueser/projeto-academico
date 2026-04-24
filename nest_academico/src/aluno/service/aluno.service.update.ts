import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';

@Injectable()
export class AlunoServiceUpdate {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async update(id: number, request: AlunoRequest): Promise<AlunoResponse> {
    const aluno = await this.alunoRepository.findOne({
      where: { idAluno: id },
    });

    if (!aluno) {
      throw new HttpException('Aluno não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(aluno, request);
    const updated = await this.alunoRepository.save(aluno);

    return new AlunoResponse(updated);
  }
}
