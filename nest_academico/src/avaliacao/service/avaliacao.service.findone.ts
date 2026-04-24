import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class AvaliacaoServiceFindOne {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async findOne(id: number): Promise<AvaliacaoResponse> {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: id },
    });

    if (!avaliacao) {
      throw new HttpException('Avaliacao não encontrado.', HttpStatus.NOT_FOUND);
    }

    return new AvaliacaoResponse(avaliacao);
  }
}
