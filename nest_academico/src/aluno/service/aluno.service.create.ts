import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';

@Injectable()
export class AlunoServiceCreate {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async create(request: AlunoRequest): Promise<AlunoResponse> {
    const existing = await this.alunoRepository.findOne({
      where: { codAluno: request.codAluno },
    });

    if (existing) {
      throw new HttpException(
        'Código de aluno já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAluno = this.alunoRepository.create(request);
    const saved = await this.alunoRepository.save(newAluno);

    return new AlunoResponse(saved);
  }
}
