import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from '../entities/recurso.entity';
import { RecursoRequest } from '../dto/request/recurso.request';
import { RecursoResponse } from '../dto/response/recurso.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class RecursoServiceUpdate {
  constructor(
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async update(id: number, request: RecursoRequest): Promise<RecursoResponse> {
    const recurso = await this.recursoRepository.findOne({
      where: { idRecurso: id },
    });

    if (!recurso) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(recurso, request);
    const updated = await this.recursoRepository.save(recurso);

    return new RecursoResponse(updated);
  }
}
