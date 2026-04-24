import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from '../entities/recurso.entity';
import { RecursoRequest } from '../dto/request/recurso.request';
import { RecursoResponse } from '../dto/response/recurso.response';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class RecursoServiceCreate {
  constructor(
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async create(request: RecursoRequest): Promise<RecursoResponse> {
    const existing = await this.recursoRepository.findOne({
      where: { nomeRecurso: request.nomeRecurso },
    });

    if (existing) {
      throw new HttpException(
        'Recurso já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRecurso = this.recursoRepository.create(request);
    const saved = await this.recursoRepository.save(newRecurso);

    return new RecursoResponse(saved);
  }
}
