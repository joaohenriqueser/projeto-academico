import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';
import { AvaliacaoRequest } from '../dto/request/avaliacao.request';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { HttpException } from '@nestjs/common';

@Injectable()
export class AvaliacaoServiceUpdate {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async update(id: number, request: AvaliacaoRequest): Promise<AvaliacaoResponse> {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: id },
    });

    if (!avaliacao) {
      throw new HttpException('Avaliacao não encontrado.', HttpStatus.NOT_FOUND);
    }

    Object.assign(avaliacao, request);
    const updated = await this.avaliacaoRepository.save(avaliacao);

    return new AvaliacaoResponse(updated);
  }
}
