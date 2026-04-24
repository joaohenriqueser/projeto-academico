import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';
import { AvaliacaoRequest } from '../dto/request/avaliacao.request';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AvaliacaoServiceCreate {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async create(request: AvaliacaoRequest): Promise<AvaliacaoResponse> {
    const existing = await this.avaliacaoRepository.findOne({
      where: { descricao: request.descricao },
    });

    if (existing) {
      throw new HttpException(
        'Avaliacao já cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAvaliacao = this.avaliacaoRepository.create(request);
    const saved = await this.avaliacaoRepository.save(newAvaliacao);

    return new AvaliacaoResponse(saved);
  }
}
