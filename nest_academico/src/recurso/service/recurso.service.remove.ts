import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from '../entities/recurso.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class RecursoServiceRemove {
  constructor(
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async remove(id: number): Promise<boolean> {
    const recurso = await this.recursoRepository.findOne({
      where: { idRecurso: id },
    });

    if (!recurso) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.recursoRepository.remove(recurso);
    return true;
  }
}
