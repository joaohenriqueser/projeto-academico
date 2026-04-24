import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from '../entities/recurso.entity';
import { RecursoResponse } from '../dto/response/recurso.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class RecursoServiceFindOne {
  constructor(
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async findOne(id: number): Promise<RecursoResponse> {
    const recurso = await this.recursoRepository.findOne({
      where: { idRecurso: id },
    });

    if (!recurso) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new RecursoResponse(recurso);
  }
}
